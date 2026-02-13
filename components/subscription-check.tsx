"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function SubscriptionCheck() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const initiatedRef = useRef(false);

    const upgradePlan = searchParams.get("upgrade");

    useEffect(() => {
        if (upgradePlan && !initiatedRef.current) {
            setOpen(true);
            initiatedRef.current = true;
        }
    }, [upgradePlan]);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            // Initiate payment
            const response = await fetch("/api/subscription/paytm/initiate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ planType: upgradePlan, amount: upgradePlan === 'pro' ? 29 : 99 }), // Hardcoded amounts for now, ideally fetch from config
            });

            if (!response.ok) {
                throw new Error("Failed to initiate payment");
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
                // document.body.removeChild(form); // Don't remove, we are redirecting away
            }

        } catch (error) {
            console.error("Subscription auto-trigger error:", error);
            alert("Failed to continue subscription.");
            setOpen(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Complete your Upgrade</DialogTitle>
                    <DialogDescription>
                        You are almost there! Click below to complete your upgrade to the {upgradePlan} plan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirm} disabled={loading}>
                        {loading ? "Processing..." : "Proceed to Payment"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
