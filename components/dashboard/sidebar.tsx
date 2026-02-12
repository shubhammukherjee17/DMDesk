"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Bell,
    Home,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users,
    Settings,
    HelpCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useOrderCount } from "@/hooks/use-order-count"

export function Sidebar() {
    const pathname = usePathname()
    const orderCount = useOrderCount()

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className="">DMDesk</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="/dashboard"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname === "/dashboard"
                                    ? "bg-muted text-primary font-bold shadow-sm"
                                    : "text-muted-foreground"
                            )}
                        >
                            <Home className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/orders"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname.startsWith("/orders")
                                    ? "bg-muted text-primary font-bold shadow-sm"
                                    : "text-muted-foreground"
                            )}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Orders
                            {orderCount > 0 && (
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {orderCount}
                                </Badge>
                            )}
                        </Link>
                        <Link
                            href="/products"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname.startsWith("/products")
                                    ? "bg-muted text-primary font-bold shadow-sm"
                                    : "text-muted-foreground"
                            )}
                        >
                            <Package className="h-4 w-4" />
                            Products
                        </Link>
                        <Link
                            href="/customers"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname.startsWith("/customers")
                                    ? "bg-muted text-primary font-bold shadow-sm"
                                    : "text-muted-foreground"
                            )}
                        >
                            <Users className="h-4 w-4" />
                            Customers
                        </Link>
                        <Link
                            href="/analytics"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname.startsWith("/analytics")
                                    ? "bg-muted text-primary font-bold shadow-sm"
                                    : "text-muted-foreground"
                            )}
                        >
                            <LineChart className="h-4 w-4" />
                            Analytics
                        </Link>
                        <Link
                            href="/support"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname.startsWith("/support")
                                    ? "bg-muted text-primary font-bold shadow-sm"
                                    : "text-muted-foreground"
                            )}
                        >
                            <HelpCircle className="h-4 w-4" />
                            Support
                        </Link>
                        <Link
                            href="/settings"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname.startsWith("/settings")
                                    ? "bg-muted text-primary font-bold shadow-sm"
                                    : "text-muted-foreground"
                            )}
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
