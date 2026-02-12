import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'
import { CreateOrderInput } from '@/lib/validations/orders'

type OrderWithCustomer = Database['public']['Tables']['orders']['Row'] & {
    customers: {
        name: string
        email: string | null
    } | null
}

export class OrderService {
    private supabase: SupabaseClient<Database>

    constructor(supabase: SupabaseClient<Database>) {
        this.supabase = supabase
    }

    async createOrder(userId: string, input: CreateOrderInput) {
        // 1. Find or Create Customer
        let customerId: string | null = null

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: existingCustomer } = await (this.supabase as any)
            .from('customers')
            .select('id')
            .eq('user_id', userId)
            .eq('name', input.customerName)
            .maybeSingle()

        if (existingCustomer) {
            customerId = existingCustomer.id
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: newCustomer, error: customerError } = await (this.supabase as any)
                .from('customers')
                .insert({
                    user_id: userId,
                    name: input.customerName,
                })
                .select()
                .single()

            if (customerError) {
                console.error('Error creating customer:', customerError)
                throw new Error('Failed to create customer')
            }
            customerId = newCustomer.id
        }

        // 2. Create Order
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: order, error: orderError } = await (this.supabase as any)
            .from('orders')
            .insert({
                user_id: userId,
                customer_id: customerId,
                status: input.status,
                total_amount: input.amount,
                payment_status: input.paymentStatus ?? (input.status === 'paid' ? 'paid' : 'pending'),
            })
            .select()
            .single()

        if (orderError) {
            console.error('Error creating order:', orderError)
            throw new Error(orderError.message)
        }

        return order
    }

    async updateOrder(orderId: string, updates: Partial<CreateOrderInput>) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: order, error } = await (this.supabase as any)
            .from('orders')
            .update({
                status: updates.status,
                total_amount: updates.amount,
                payment_status: updates.paymentStatus,
            })
            .eq('id', orderId)
            .select()
            .single()

        if (error) {
            console.error('Error updating order:', error)
            throw new Error(error.message)
        }

        return order
    }

    async deleteOrder(orderId: string) {
        const { error } = await this.supabase
            .from('orders')
            .delete()
            .eq('id', orderId)

        if (error) {
            console.error('Error deleting order:', error)
            throw new Error(error.message)
        }
    }

    async getOrders() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (this.supabase as any)
            .from('orders')
            .select(`
                *,
                customers (
                    name,
                    email
                )
            `)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching orders:', error)
            throw new Error(error.message)
        }

        const orders = data as OrderWithCustomer[]

        return orders.map(order => ({
            ...order,
            customerName: order.customers?.name || 'Unknown',
            customerEmail: order.customers?.email || 'N/A',
        }))
    }
}
