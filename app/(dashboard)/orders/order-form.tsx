'use client'

import { Button } from "@/components/ui/button"
import {
    Label,
} from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface OrderFormProps extends React.HTMLAttributes<HTMLFormElement> {
    initialData?: {
        customerName?: string
        amount?: number
        status?: string
        notes?: string
    }
    action: (formData: FormData) => Promise<{ error?: any; success?: boolean }>
    onSuccess?: () => void
}

export function OrderForm({ initialData, action, onSuccess, className, ...props }: OrderFormProps) {
    async function handleSubmit(formData: FormData) {
        const result = await action(formData)
        if (result?.error) {
            alert(JSON.stringify(result.error)) // Simple error handling for now
        } else {
            if (onSuccess) onSuccess()
        }
    }

    return (
        <form action={handleSubmit} className={cn("grid gap-4 py-4", className)} {...props}>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerName" className="text-right">
                    Name
                </Label>
                <Input
                    id="customerName"
                    name="customerName"
                    className="col-span-3"
                    placeholder="Jane Doe"
                    defaultValue={initialData?.customerName}
                    readOnly={!!initialData?.customerName} // Read-only if updating
                    required={!initialData?.customerName}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                    Amount
                </Label>
                <Input
                    id="amount"
                    name="amount"
                    className="col-span-3"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    defaultValue={initialData?.amount}
                    required
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                    Status
                </Label>
                <Select name="status" defaultValue={initialData?.status || "pending"}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending Payment</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                    Notes
                </Label>
                <Textarea
                    id="notes"
                    name="notes"
                    className="col-span-3"
                    placeholder="Optional notes"
                    defaultValue={initialData?.notes}
                />
            </div>
            <div className="flex justify-end pt-4">
                <Button type="submit">Save changes</Button>
            </div>
        </form>
    )
}
