'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createOrderSchema } from '@/lib/validations/orders'
import { OrderService } from '@/lib/services/order-service'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

export async function createOrder(formData: FormData) {
    const supabase = (await createClient()) as SupabaseClient<Database>

    const rawData = {
        customerName: formData.get('customerName'),
        amount: parseFloat(formData.get('amount') as string),
        status: formData.get('status'),
        notes: formData.get('notes'),
    }

    // Validate input
    const validatedFields = createOrderSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    try {
        const orderService = new OrderService(supabase)
        await orderService.createOrder(user.id, {
            ...validatedFields.data,
            paymentStatus: validatedFields.data.paymentStatus as "paid" | "pending" | "failed" | undefined
        })

        revalidatePath('/orders')
        return { success: true }
    } catch (error) {
        console.error('Failed to create order:', error)
        return { error: 'Failed to create order. Please try again.' }
    }
}

export async function getOrdersForExport() {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        console.error('Auth check failed:', authError)
        // Debug: Log cookies (safely)
        const cookieStore = await import('next/headers').then(mod => mod.cookies())
        const allCookies = cookieStore.getAll().map(c => c.name)
        console.log('Available cookies:', allCookies)

        return { error: 'Not authenticated' }
    }
    console.log('User authenticated for export:', user.id)

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Export error:', error)
        return { error: error.message }
    }

    return { data }
}

export async function deleteOrder(orderId: string) {
    const supabase = (await createClient()) as SupabaseClient<Database>
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    try {
        const orderService = new OrderService(supabase)
        await orderService.deleteOrder(orderId)
        revalidatePath('/orders')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete order:', error)
        return { error: 'Failed to delete order' }
    }
}

export async function updateOrder(orderId: string, formData: FormData) {
    const supabase = (await createClient()) as SupabaseClient<Database>
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const rawData = {
        amount: parseFloat(formData.get('amount') as string),
        status: formData.get('status'),
        // customerName is not updatable in this simple version for now
        // customerName: formData.get('customerName'),
    }

    // We reuse createOrderSchema but make fields optional or pick what we need
    // For now, let's just manually validate/construct the update object
    const validation = createOrderSchema.partial().safeParse(rawData)

    if (!validation.success) {
        return { error: validation.error.flatten().fieldErrors }
    }

    try {
        const orderService = new OrderService(supabase)
        await orderService.updateOrder(orderId, validation.data)
        revalidatePath('/orders')
        return { success: true }
    } catch (error) {
        console.error('Failed to update order:', error)
        return { error: 'Failed to update order' }
    }
}
