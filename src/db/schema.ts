import { pgTable, text, serial, integer, timestamp, boolean, decimal, jsonb } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    weight: integer('weight').notNull(), // weight in grams
    imageUrl: text('image_url').notNull(),
    category: text('category').notNull(),
    stock: integer('stock').notNull().default(0),
    isFeatured: boolean('is_featured').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    userId: text('user_id'), // Firebase UID
    customerName: text('customer_name').notNull(),
    customerEmail: text('customer_email').notNull(),
    customerPhone: text('customer_phone').notNull(),
    shippingAddress: text('shipping_address').notNull(),
    totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
    razorpayOrderId: text('razorpay_order_id'),
    razorpayPaymentId: text('razorpay_payment_id'),
    shiprocketOrderId: text('shiprocket_order_id'),
    shiprocketShipmentId: text('shiprocket_shipment_id'),
    status: text('status').default('pending'), // pending, paid, shipped, delivered, cancelled
    items: jsonb('items').notNull(), // [{ productId, quantity, price, name, image }]
    totalWeight: integer('total_weight').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const wishlist = pgTable('wishlist', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    productId: integer('product_id').notNull().references(() => products.id),
    createdAt: timestamp('created_at').defaultNow(),
});
