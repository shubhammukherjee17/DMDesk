export const paytmConfig = {
    mid: process.env.PAYTM_MID || "", // Merchant ID
    key: process.env.PAYTM_MERCHANT_KEY || "", // Merchant Key
    website: process.env.PAYTM_WEBSITE || "WEBSTAGING",
    url: process.env.PAYTM_URL || "https://securegw-stage.paytm.in/theia/processTransaction",
    callbackUrl: process.env.PAYTM_CALLBACK_URL || "http://localhost:3000/api/payment/paytm/callback",
};
