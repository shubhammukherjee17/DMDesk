import { NextRequest, NextResponse } from "next/server";
const PaytmChecksum = require("paytmchecksum");
import { paytmConfig } from "@/lib/paytm/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(
    request: NextRequest,
    { params }: { params: { orderId: string } }
) {
    try {
        const supabase = await createClient();
        const formData = await request.formData();
        const paytmParams: any = {};
        const { orderId } = params;

        formData.forEach((value, key) => {
            paytmParams[key] = value;
        });

        const isValidChecksum = await PaytmChecksum.verifySignature(
            paytmParams,
            paytmConfig.key,
            paytmParams.CHECKSUMHASH
        );

        if (!isValidChecksum) {
            console.error("Checksum mismatch");
            return NextResponse.redirect(`${request.nextUrl.origin}/subscription/failed?orderId=${orderId}`);
        }

        const { STATUS, TXNID } = paytmParams;

        if (STATUS === "TXN_SUCCESS") {
            // 1. Update subscription_payments status
            const { data: subscription, error: paymentError } = await supabase
                .from('subscription_payments')
                .update({
                    status: 'paid',
                    payment_id: TXNID
                })
                .eq('order_id', orderId)
                .select() // Select to get plan_type and user_id
                .single();

            if (paymentError || !subscription) {
                console.error("Error updating payment:", paymentError);
                return NextResponse.redirect(`${request.nextUrl.origin}/subscription/failed?orderId=${orderId}&reason=db_error`);
            }

            // 2. Update user plan
            const { error: userError } = await supabase
                .from('users')
                .update({ plan: subscription.plan_type })
                .eq('id', subscription.user_id);

            if (userError) {
                console.error("Error updating user plan:", userError);
                // Verify if we should rollback payment status? probably manual intervention needed.
            }

            return NextResponse.redirect(`${request.nextUrl.origin}/subscription/success?orderId=${orderId}`);
        } else {
            await supabase
                .from('subscription_payments')
                .update({
                    status: 'failed',
                    payment_id: TXNID
                })
                .eq('order_id', orderId);
            return NextResponse.redirect(`${request.nextUrl.origin}/subscription/failed?orderId=${orderId}`);
        }

    } catch (error) {
        console.error("Paytm Callback Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
