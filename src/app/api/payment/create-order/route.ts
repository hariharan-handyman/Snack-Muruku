export const dynamic = "force-dynamic";
import { getDb } from "@/lib/db";
import { orders } from "@/db/schema";
import { getRazorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const db = getDb();
        const { items, amount, customer } = await req.json();
        const razorpay = getRazorpay();

        // 1. Create Razorpay Order
        const options = {
            amount: Math.round(amount * 100), // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const rzpOrder = await razorpay.orders.create(options);

        // 2. Save Initial Order to Database (Pending)
        const totalWeight = items.reduce((acc: number, item: any) => acc + item.weight * item.quantity, 0);

        const [newOrder] = await db.insert(orders).values({
            customerName: customer.name,
            customerEmail: customer.email,
            customerPhone: customer.phone,
            shippingAddress: `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`,
            totalAmount: amount.toString(),
            razorpayOrderId: rzpOrder.id,
            status: "pending",
            items: items,
            totalWeight: totalWeight,
        }).returning();

        return NextResponse.json({
            id: rzpOrder.id,
            amount: rzpOrder.amount,
            dbOrderId: newOrder.id,
        });
    } catch (error) {
        console.error("Order Creation Error:", error);
        return NextResponse.json({ error: "Order initialization failed" }, { status: 500 });
    }
}
