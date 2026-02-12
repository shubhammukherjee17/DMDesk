"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function useOrderCount() {
    const [count, setCount] = useState<number>(0)
    const supabase = createClient()

    useEffect(() => {
        // Initial fetch
        const fetchCount = async () => {
            const { count, error } = await supabase
                .from("orders")
                .select("*", { count: "exact", head: true })

            if (!error && count !== null) {
                setCount(count)
            }
        }

        fetchCount()

        // Real-time subscription
        const channel = supabase
            .channel("orders-count-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "orders",
                },
                (payload) => {
                    // Re-fetch count on any change to ensure accuracy
                    // Alternatively, we could increment/decrement based on event type, 
                    // but re-fetching is safer for data consistency.
                    fetchCount()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return count
}
