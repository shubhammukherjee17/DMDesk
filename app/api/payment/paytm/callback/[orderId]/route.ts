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
            return NextResponse.redirect(`${request.nextUrl.origin}/payment/failed?orderId=${orderId}`);
        }

        const { STATUS, TXNID } = paytmParams;

        if (STATUS === "TXN_SUCCESS") {
            const { error } = await supabase
                .from('orders')
                .update({
                    payment_status: 'paid',
                    payment_id: TXNID,
                    status: 'paid'
                })
                .eq('id', orderId);

            if (error) {
                console.error("Error updating order:", error);
                // Even if DB update fails, payment was successful. Log critical error.
            }
            return NextResponse.redirect(`${request.nextUrl.origin}/payment/success?orderId=${orderId}`);
        } else {
            const { error } = await supabase
                .from('orders')
                .update({
                    payment_status: 'failed',
                    payment_id: TXNID
                })
                .eq('id', orderId);
            return NextResponse.redirect(`${request.nextUrl.origin}/payment/failed?orderId=${orderId}`);
        }

    } catch (error) {
        console.error("Paytm Callback Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
