import { db } from "@/lib/db";
import { orders } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
        return NextResponse.json(allOrders);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
