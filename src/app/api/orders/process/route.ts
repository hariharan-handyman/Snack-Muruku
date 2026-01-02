import { db } from "@/lib/db";
import { orders } from "@/db/schema";
import { getShiprocketToken } from "@/lib/shiprocket";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const { orderId } = await req.json();

        const order = await db.query.orders.findFirst({
            where: eq(orders.id, orderId),
        });

        if (!order || order.status !== "paid") {
            return NextResponse.json({ error: "Order not eligible for shipping" }, { status: 400 });
        }

        const token = await getShiprocketToken();

        // Push to Shiprocket
        const shiprocketBody = {
            order_id: `HN-${order.id}`,
            order_date: new Date(order.createdAt!).toISOString().split('T')[0],
            pickup_location: process.env.PICKUP_ADDRESS || "Primary",
            billing_customer_name: order.customerName,
            billing_last_name: "",
            billing_address: order.shippingAddress,
            billing_city: "Coimbatore", // Ideally extracted from address
            billing_pincode: "641028", // Ideally extracted from address
            billing_state: "Tamil Nadu",
            billing_country: "India",
            billing_email: order.customerEmail,
            billing_phone: order.customerPhone,
            shipping_is_billing: true,
            order_items: order.items.map((item: any) => ({
                name: item.name,
                sku: item.id.toString(),
                units: item.quantity,
                selling_price: item.price,
            })),
            payment_method: "Prepaid",
            sub_total: order.totalAmount,
            length: 10,
            width: 10,
            height: 10,
            weight: (order.totalWeight + 500) / 1000,
        };

        const response = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(shiprocketBody),
        });

        const data = await response.json();

        if (data.order_id) {
            await db.update(orders)
                .set({
                    status: "shipped",
                    shiprocketOrderId: data.order_id.toString(),
                    shiprocketShipmentId: data.shipment_id?.toString()
                })
                .where(eq(orders.id, orderId));

            return NextResponse.json({ success: true, shiprocketOrderId: data.order_id });
        } else {
            return NextResponse.json({ error: data.message || "Shiprocket sync failed" }, { status: 500 });
        }
    } catch (error) {
        console.error("Order processing Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
