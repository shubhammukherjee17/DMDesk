'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { AuthError } from '@supabase/supabase-js'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    const returnTo = formData.get('return_to') as string || '/dashboard'

    revalidatePath('/', 'layout')
    redirect(returnTo)
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const businessName = formData.get('businessName') as string
    const instagramHandle = formData.get('instagramHandle') as string

    const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                business_name: businessName,
                instagram_handle: instagramHandle
            }
        }
    })

    if (error) {
        return { error: error.message }
    }

    // Create user profile in 'users' table
    if (data.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: profileError } = await (supabase as any).from('users').insert({
            id: data.user.id,
            email: email,
            business_name: businessName,
            instagram_handle: instagramHandle
        })

        if (profileError) {
            console.error('Error creating user profile:', profileError)
            // Ideally rollback or retry, but for MVP logging is ok
        }
    }

    revalidatePath('/', 'layout')
    const returnTo = formData.get('return_to') as string || '/dashboard'
    redirect(returnTo)
}

export async function logout() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/login')
}
