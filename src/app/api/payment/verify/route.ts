export const dynamic = "force-dynamic";
import { getDb } from "@/lib/db";
import { orders } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const db = getDb();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await req.json();

        const text = razorpay_order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(text)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            // Payment Verified
            await db.update(orders)
                .set({
                    status: "paid",
                    razorpayPaymentId: razorpay_payment_id
                })
                .where(eq(orders.id, orderId));

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}
