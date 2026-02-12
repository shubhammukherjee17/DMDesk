import { createClient } from "@/lib/supabase/server"
import { OrderService } from "@/lib/services/order-service"
import { OrdersClient } from "./client"

export default async function OrdersPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Handle auth appropriately, e.g. redirect or show empty
    if (!user) {
        return <div>Please log in to view orders.</div>
    }

    const orderService = new OrderService(supabase)
    const orders = await orderService.getOrders()

    return <OrdersClient orders={orders} />
}
