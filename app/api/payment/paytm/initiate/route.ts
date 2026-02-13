import { NextRequest, NextResponse } from "next/server";
const PaytmChecksum = require("paytmchecksum");
import { paytmConfig } from "@/lib/paytm/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { orderId, amount, customerId } = await request.json();

        if (!orderId || !amount || !customerId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const paytmParams: any = {};

        paytmParams.body = {
            requestType: "Payment",
            mid: paytmConfig.mid,
            websiteName: paytmConfig.website,
            orderId: orderId,
            callbackUrl: `${paytmConfig.callbackUrl}/${orderId}`,
            txnAmount: {
                value: amount.toString(),
                currency: "INR",
            },
            userInfo: {
                custId: customerId,
            },
        };

        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            paytmConfig.key
        );

        paytmParams.head = {
            signature: checksum,
        };

        return NextResponse.json({
            ...paytmParams,
            url: paytmConfig.url
        });
    } catch (error) {
        console.error("Paytm Initiation Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
