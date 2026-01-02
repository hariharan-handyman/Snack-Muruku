"use client";

import { useState, useEffect } from "react";
import {
    TrendingUp,
    ShoppingBag,
    Users,
    Package,
    ArrowUpRight,
    ChevronRight,
    Clock
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        revenue: "₹45,850",
        orders: "128",
        customers: "84",
        products: "24"
    });

    const recentOrders = [
        { id: "0482", customer: "Amrita Nair", amount: "₹850", status: "Paid", time: "2 mins ago" },
        { id: "0481", customer: "Rajesh Kumar", amount: "₹1,240", status: "Shipped", time: "1 hour ago" },
        { id: "0480", customer: "Sneha Reddy", amount: "₹250", status: "Delivered", time: "3 hours ago" },
    ];

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-black text-secondary font-serif mb-2">Heritage Analytics</h1>
                <p className="text-secondary/50 font-medium italic">&quot;Taste that transcends generations, tracked in real-time.&quot;</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: stats.revenue, icon: TrendingUp, color: "golden", trend: "+12.5%" },
                    { label: "New Orders", value: stats.orders, icon: ShoppingBag, color: "blue", trend: "+8.2%" },
                    { label: "Total Customers", value: stats.customers, icon: Users, color: "deep", trend: "+5.1%" },
                    { label: "Active Products", value: stats.products, icon: Package, color: "maroon", trend: "0%" },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm group hover:shadow-xl transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-2xl bg-gray-50 text-secondary group-hover:bg-primary group-hover:text-white transition-colors`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-xs font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                                <ArrowUpRight size={12} /> {stat.trend}
                            </span>
                        </div>
                        <p className="text-sm text-secondary/40 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-secondary font-serif">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-secondary font-serif">Recent Orders</h3>
                        <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-[10px] font-black text-secondary/30 uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-4">Order</th>
                                    <th className="px-8 py-4">Customer</th>
                                    <th className="px-8 py-4">Amount</th>
                                    <th className="px-8 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5 font-bold text-secondary">#{order.id}</td>
                                        <td className="px-8 py-5 text-secondary/70 font-medium">{order.customer}</td>
                                        <td className="px-8 py-5 font-black text-secondary">{order.amount}</td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Brand Activity */}
                <div className="bg-secondary text-white rounded-[40px] p-10 shadow-2xl shadow-secondary/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                        <Clock className="text-white/10 w-24 h-24 rotate-12" />
                    </div>
                    <h3 className="text-2xl font-serif font-black mb-8 relative z-10">Live Activity</h3>
                    <div className="space-y-8 relative z-10">
                        {[
                            { text: "New product 'Classic Muruku' added", time: "12 mins ago" },
                            { text: "Inventory alert: Spicy Ribbon low on stock", time: "45 mins ago" },
                            { text: "Payment captured for order #0482", time: "1 hour ago" },
                            { text: "Shipment dispatch for heritage pack", time: "3 hours ago" },
                        ].map((act, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-white/90 leading-tight">{act.text}</p>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-12 py-4 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                        Audit Registry <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
