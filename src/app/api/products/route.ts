import { getDb } from "@/lib/db";
import { products } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const db = getDb();
        const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
        return NextResponse.json(allProducts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const db = getDb();
        const body = await req.json();
        const { name, category, price, weight, stock, description, imageUrl } = body;

        const newProduct = await db.insert(products).values({
            name,
            category,
            price: price.toString(),
            weight,
            stock,
            description,
            imageUrl,
        }).returning();

        return NextResponse.json(newProduct[0]);
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
