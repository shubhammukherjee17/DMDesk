import { z } from "zod"

export const createOrderSchema = z.object({
    customerName: z.string().min(1, "Customer name is required"),
    amount: z.number().min(0, "Amount must be positive"),
    status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]),
    paymentStatus: z.enum(["paid", "pending", "failed"]).optional(),
    notes: z.string().optional(),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
