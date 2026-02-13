"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PaytmButtonProps {
    orderId: string;
    amount: number;
    customerId: string;
}

export function PaytmButton({ orderId, amount, customerId }: PaytmButtonProps) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/payment/paytm/initiate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId, amount, customerId }),
            });

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
        <Button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Pay with Paytm"}
        </Button>
    );
}
