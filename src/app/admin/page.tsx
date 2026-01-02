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
        <div className="space-y-10 font-sans">
            <header>
                <h1 className="text-2xl font-bold text-primary tracking-tight mb-1 uppercase tracking-widest">Operational Intelligence</h1>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Metrics and distribution tracking for Handyman Technologies.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Net Revenue", value: stats.revenue, icon: TrendingUp, color: "golden", trend: "+12.5%" },
                    { label: "Fulfillment Orders", value: stats.orders, icon: ShoppingBag, color: "blue", trend: "+8.2%" },
                    { label: "Client Base", value: stats.customers, icon: Users, color: "deep", trend: "+5.1%" },
                    { label: "Product Skus", value: stats.products, icon: Package, color: "maroon", trend: "0%" },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group hover:border-slate-300 transition-all pro-card"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-background-alt text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                                <ArrowUpRight size={10} /> {stat.trend}
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-primary tracking-tight">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden pro-card">
                    <div className="px-8 py-6 border-b border-background-alt flex justify-between items-center">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Transaction History</h3>
                        <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">Full Export</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-background-alt text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-3">Order SKU</th>
                                    <th className="px-8 py-3">Client</th>
                                    <th className="px-8 py-3">Value</th>
                                    <th className="px-8 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-background-alt text-xs">
                                {recentOrders.map((order, i) => (
                                    <tr key={i} className="hover:bg-background-alt/50 transition-colors">
                                        <td className="px-8 py-4 font-bold text-primary">#HN-{order.id}</td>
                                        <td className="px-8 py-4 text-slate-500 font-medium">{order.customer}</td>
                                        <td className="px-8 py-4 font-bold text-primary">{order.amount}</td>
                                        <td className="px-8 py-4">
                                            <span className="px-2 py-0.5 bg-background-alt text-slate-600 rounded text-[9px] font-bold uppercase tracking-widest">
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
                <div className="bg-primary text-white rounded-xl p-8 border border-slate-800 shadow-sm relative overflow-hidden flex flex-col pro-card">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-8 relative z-10 flex items-center justify-between">
                        Live Stream
                        <Clock size={14} className="text-white/20" />
                    </h3>
                    <div className="space-y-6 relative z-10 flex-1">
                        {[
                            { text: "Logistics: New product batch synced", time: "12 mins ago" },
                            { text: "Inventory: Supply threshold warning", time: "45 mins ago" },
                            { text: "Finance: Payment ledger updated", time: "1 hour ago" },
                            { text: "Dispatch: Official shipping manifest created", time: "3 hours ago" },
                        ].map((act, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-white/90 leading-tight">{act.text}</p>
                                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-10 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                        Registry Audit <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
