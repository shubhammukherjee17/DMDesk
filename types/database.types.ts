export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string
                    business_name: string | null
                    instagram_handle: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    email: string
                    business_name?: string | null
                    instagram_handle?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    business_name?: string | null
                    instagram_handle?: string | null
                    created_at?: string
                }
            }
            customers: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    phone: string | null
                    email: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    phone?: string | null
                    email?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    phone?: string | null
                    email?: string | null
                    created_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    price: number
                    stock: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    price: number
                    stock?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    price?: number
                    stock?: number | null
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    user_id: string
                    customer_id: string | null
                    status: string | null
                    payment_status: string | null
                    total_amount: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    customer_id?: string | null
                    status?: string | null
                    payment_status?: string | null
                    total_amount: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    customer_id?: string | null
                    status?: string | null
                    payment_status?: string | null
                    total_amount?: number
                    created_at?: string
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string | null
                    quantity: number
                    price: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id?: string | null
                    quantity?: number
                    price: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string | null
                    quantity?: number
                    price?: number
                    created_at?: string
                }
            }
            addresses: {
                Row: {
                    id: string
                    order_id: string
                    full_name: string
                    phone: string | null
                    address_line: string
                    city: string
                    state: string | null
                    postal_code: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    full_name: string
                    phone?: string | null
                    address_line: string
                    city: string
                    state?: string | null
                    postal_code?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    full_name?: string
                    phone?: string | null
                    address_line?: string
                    city?: string
                    state?: string | null
                    postal_code?: string | null
                    created_at?: string
                }
            }
        }
    }
}
