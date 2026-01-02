"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    Eye,
    Truck,
    CreditCard,
    Clock,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
    ChevronRight,
    Loader2
} from "lucide-react";
import Image from "next/image";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<number | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        setLoading(true);
        fetch("/api/orders")
            .then((res) => res.json())
            .then((data) => setOrders(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
    };

    const processOrder = async (orderId: number) => {
        setProcessing(orderId);
        try {
            const res = await fetch("/api/orders/process", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });
            if (res.ok) {
                alert("Order synced to Shiprocket!");
                fetchOrders();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to process order");
            }
        } catch (e) {
            alert("An error occurred");
        } finally {
            setProcessing(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "delivered": return "bg-green-100 text-green-700 border-green-200";
            case "shipped": return "bg-blue-100 text-blue-700 border-blue-200";
            case "paid": return "bg-primary/10 text-primary border-primary/20";
            case "pending": return "bg-orange-100 text-orange-700 border-orange-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getPaymentIcon = (status: string) => {
        if (status?.toLowerCase() === "paid" || status?.toLowerCase() === "delivered" || status?.toLowerCase() === "shipped") {
            return <CheckCircle2 size={14} className="text-green-600" />;
        }
        return <Clock size={14} className="text-orange-600" />;
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-secondary font-serif">Detailed Orders</h1>
                <p className="text-secondary/50">Track every stage of your worldwide heritage snack deliveries</p>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="relative flex-1 w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Customer..."
                            className="w-full pl-12 pr-6 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 text-secondary font-bold transition-all">
                            <Filter size={18} /> Filters
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white rounded-2xl hover:bg-secondary/90 font-bold transition-all">
                            Export CSV
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-secondary font-serif text-sm border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Order ID & Date</th>
                                <th className="px-8 py-5">Items (Preview)</th>
                                <th className="px-8 py-5">Customer Details</th>
                                <th className="px-8 py-5">Payment Status</th>
                                <th className="px-8 py-5">Shipping Stage</th>
                                <th className="px-8 py-5 text-right">Value</th>
                                <th className="px-8 py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={7} className="px-8 py-20 text-center text-gray-400 font-serif text-xl italic">Fetching your orders...</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan={7} className="px-8 py-20 text-center text-gray-400 font-serif text-xl italic">No orders found yet.</td></tr>
                            ) : orders.map((order) => (
                                <tr key={order.id} className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-secondary">#HN-{order.id.toString().padStart(4, '0')}</div>
                                        <div className="text-xs text-secondary/40 font-medium uppercase mt-1">
                                            {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex -space-x-3">
                                            {order.items?.slice(0, 3).map((item: any, idx: number) => (
                                                <div key={idx} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 relative overflow-hidden shadow-sm">
                                                    {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />}
                                                </div>
                                            ))}
                                            {order.items?.length > 3 && (
                                                <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary text-white text-[10px] flex items-center justify-center shadow-sm">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-xs font-bold text-secondary/60 mt-2">
                                            {order.items?.reduce((acc: number, item: any) => acc + item.quantity, 0)} items total
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-secondary text-sm">{order.customerName}</div>
                                        <div className="text-xs text-secondary/50 truncate max-w-[150px]">{order.customerEmail}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5">
                                                {getPaymentIcon(order.status)}
                                                <span className="text-xs font-bold uppercase tracking-wider">{order.status === 'paid' || order.status === 'shipped' || order.status === 'delivered' ? 'Captured' : 'Pending'}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-primary font-bold hover:underline cursor-pointer">
                                                <CreditCard size={10} /> Razorpay ID <ExternalLink size={8} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}>
                                                {(order.status === 'delivered') && <CheckCircle2 size={10} />}
                                                {(order.status === 'shipped') && <Truck size={10} />}
                                                {order.status}
                                            </span>
                                            {(order.shiprocketOrderId) ? (
                                                <div className="flex items-center gap-1 text-[10px] text-secondary/40 font-bold hover:text-primary transition-colors cursor-pointer">
                                                    <Truck size={10} /> ID: {order.shiprocketOrderId} <ExternalLink size={8} />
                                                </div>
                                            ) : (
                                                <div className="text-[8px] font-black text-secondary/20 uppercase">No shipment yet</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="font-serif font-black text-secondary">₹{parseFloat(order.totalAmount).toLocaleString()}</div>
                                        <div className="text-[10px] font-bold text-secondary/30 uppercase tracking-tighter">Paid via Gateway</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-end gap-2">
                                            {order.status === 'paid' && (
                                                <button
                                                    onClick={() => processOrder(order.id)}
                                                    disabled={processing === order.id}
                                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                                >
                                                    {processing === order.id ? <Loader2 size={14} className="animate-spin" /> : <Truck size={14} />}
                                                    Ship
                                                </button>
                                            )}
                                            <button className="p-3 bg-gray-50 rounded-2xl hover:bg-primary hover:text-white transition-all text-secondary">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
