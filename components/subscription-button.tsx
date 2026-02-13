"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SubscriptionButtonProps {
    planType: string;
    amount: number;
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    className?: string;
}

export function SubscriptionButton({ planType, amount, text, variant = "default", className }: SubscriptionButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubscription = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/subscription/paytm/initiate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ planType, amount }),
            });

            if (response.status === 401) {
                const returnUrl = encodeURIComponent(`/dashboard?upgrade=${planType}`);
                router.push(`/login?return_to=${returnUrl}`);
                return;
            }

            const data = await response.json();

            if (data.url && data.body && data.head) {
                const form = document.createElement("form");
                form.method = "POST";
                form.action = `${data.url}?mid=${data.body.mid}&orderId=${data.body.orderId}`;
                form.name = "paytm";

                // Add body parameters
                Object.keys(data.body).forEach((key) => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = data.body[key];
                    form.appendChild(input);
                });

                // Add head parameters (checksum)
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = "CHECKSUMHASH";
                input.value = data.head.signature;
                form.appendChild(input);

                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
            } else {
                console.error("Invalid response from server");
                alert("Payment initiation failed");
            }

        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleSubscription} disabled={loading} variant={variant} className={className}>
            {loading ? "Processing..." : text}
        </Button>
    );
}
