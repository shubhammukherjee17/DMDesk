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

        const { planType, amount } = await request.json();

        if (!planType || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const orderId = `SUB_${Date.now()}_${user.id.slice(0, 5)}`;

        // Create subscription record in DB
        const { error: dbError } = await supabase
            .from('subscription_payments')
            .insert({
                user_id: user.id,
                order_id: orderId,
                amount: amount,
                plan_type: planType,
                status: 'pending'
            });

        if (dbError) {
            console.error("Database Error:", dbError);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        const paytmParams: any = {};
        const origin = request.nextUrl.origin;

        paytmParams.body = {
            requestType: "Payment",
            mid: paytmConfig.mid,
            websiteName: paytmConfig.website,
            orderId: orderId,
            callbackUrl: `${origin}/api/subscription/paytm/callback/${orderId}`,
            txnAmount: {
                value: amount.toString(),
                currency: "INR",
            },
            userInfo: {
                custId: user.id,
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
