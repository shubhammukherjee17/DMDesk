import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

export type DashboardStats = {
    totalRevenue: number
    orderCount: number
    customerCount: number
    revenueChange: number // simplified for now
    orderChange: number
    customerChange: number
}

export type RecentSale = {
    id: string
    customerName: string
    customerEmail: string
    amount: number
    status: string
    date: string
}

export async function getDashboardStats(supabase: SupabaseClient<Database>) {
    // 1. Total Revenue (Sum of all orders)
    const { data: revenueData, error: revenueError } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('payment_status', 'paid')

    const totalRevenue = revenueData?.reduce((acc: number, order: any) => acc + (order.total_amount || 0), 0) || 0

    // 2. Order Count
    const { count: orderCount, error: orderError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

    // 3. Customer Count
    const { count: customerCount, error: customerError } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })

    // 4. Pending Payments (Orders with payment_status = 'pending')
    const { count: pendingCount, error: pendingError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'pending')

    if (revenueError || orderError || customerError || pendingError) {
        console.error('Error in getDashboardStats:', { revenueError, orderError, customerError, pendingError })
    }

    return {
        totalRevenue,
        orderCount: orderCount || 0,
        customerCount: customerCount || 0,
        pendingCount: pendingCount || 0,
    }
}

export async function getRecentSales(supabase: SupabaseClient<Database>) {
    const { data: sales, error } = await supabase
        .from('orders')
        .select(`
            id,
            total_amount,
            status,
            created_at,
            customers (
                name,
                email
            )
        `)
        .order('created_at', { ascending: false })
        .limit(5)

    if (error) {
        console.error('Error fetching recent sales full:', JSON.stringify(error, null, 2))
        return []
    }

    return (sales as any[]).map(sale => ({
        id: sale.id,
        customerName: sale.customers?.name || 'Unknown',
        customerEmail: sale.customers?.email || 'N/A',
        amount: sale.total_amount,
        status: sale.status,
        date: new Date(sale.created_at).toLocaleDateString(),
    }))
}
