import { calculateShipping } from "@/lib/shiprocket";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { pincode, weight } = await req.json();

        // Weight is coming in grams
        const shippingData = await calculateShipping(pincode, weight);

        // We'll return the cheapest or a default rate for now
        // Shiprocket returns available couriers
        if (shippingData.status === 404 || !shippingData.data?.available_courier_companies) {
            return NextResponse.json({ cost: 150 }); // Fallback flat fee
        }

        const cheapest = shippingData.data.available_courier_companies.reduce((prev: any, curr: any) =>
            prev.rate < curr.rate ? prev : curr
        );

        return NextResponse.json({ cost: Math.ceil(cheapest.rate) });
    } catch (error) {
        console.error("Shipping Calc Error:", error);
        return NextResponse.json({ cost: 150 }); // Fallback
    }
}
