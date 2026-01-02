"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowLeft,
    CreditCard,
    Truck,
    ShieldCheck,
    Loader2,
    Lock,
    ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function Checkout() {
    const router = useRouter();
    const [cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [shippingCost, setShippingCost] = useState(0);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
    });

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);
        if (savedCart.length === 0) router.push("/shop");
    }, [router]);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalWeight = cart.reduce((acc, item) => acc + item.weight * item.quantity, 0);
    const total = subtotal + shippingCost;

    const handlePincodeBlur = async () => {
        if (formData.pincode.length === 6) {
            try {
                const res = await fetch("/api/shipping/calculate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pincode: formData.pincode, weight: totalWeight }),
                });
                const data = await res.json();
                setShippingCost(data.cost || 100);
            } catch (e) {
                setShippingCost(100);
            }
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cart,
                    amount: total,
                    customer: formData
                }),
            });

            const orderData = await res.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: "INR",
                name: "HANDYMAN",
                description: "Professional Snack Distribution",
                order_id: orderData.id,
                handler: async (response: any) => {
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...response, orderId: orderData.dbOrderId }),
                    });

                    if (verifyRes.ok) {
                        localStorage.removeItem("cart");
                        router.push(`/order-success?id=${orderData.dbOrderId}`);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: { color: "#0F172A" },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            alert("Payment initialization failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-alt font-sans pb-20">
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>

            <div className="max-w-6xl mx-auto px-6 pt-12">
                <Link href="/shop" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm mb-10 transition-colors group">
                    <ArrowLeft size={16} /> Back to Catalog
                </Link>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Form Side */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                            <header className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-primary">
                                    <Truck size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-primary">Shipping Information</h2>
                                    <p className="text-xs text-slate-500">Professional logistics verification required.</p>
                                </div>
                            </header>

                            <div className="grid gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Consignee Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-400 outline-none text-sm text-primary transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="corporate@example.com"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-400 outline-none text-sm text-primary transition-all"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-400 outline-none text-sm text-primary transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Street Address</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Full delivery address..."
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-400 outline-none text-sm text-primary transition-all resize-none"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                                <div className="grid md:grid-cols-3 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Zip/Pincode</label>
                                        <input
                                            type="text"
                                            placeholder="000000"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-400 outline-none text-sm text-primary transition-all"
                                            value={formData.pincode}
                                            onBlur={handlePincodeBlur}
                                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">City</label>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-400 outline-none text-sm text-primary transition-all"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">State</label>
                                        <input
                                            type="text"
                                            placeholder="State"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-400 outline-none text-sm text-primary transition-all"
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Side */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm overflow-hidden">
                            <h3 className="text-lg font-bold mb-6 text-primary flex items-center justify-between">
                                Order Summary
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">Verified Unit</span>
                            </h3>

                            <div className="space-y-4 mb-6 max-h-[240px] overflow-y-auto no-scrollbar">
                                {cart.map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                        <div className="w-12 h-12 bg-slate-50 rounded-lg relative overflow-hidden flex-shrink-0 border border-slate-100">
                                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[13px] text-primary line-clamp-1">{item.name}</h4>
                                            <p className="text-[11px] text-slate-400">{item.quantity} Unit(s) at ₹{item.price}</p>
                                        </div>
                                        <div className="font-bold text-sm text-primary">₹{item.price * item.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-slate-100">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="text-primary tracking-normal">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <span>Logistics Fee</span>
                                    <span className="text-primary tracking-normal">₹{shippingCost}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                    <span className="text-sm font-bold text-primary uppercase tracking-widest">Total Amount</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-primary leading-none">₹{total}</div>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Weight: {((totalWeight + 500) / 1000).toFixed(2)} KG</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading || cart.length === 0}
                                className="w-full mt-8 py-4 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Lock size={16} />}
                                {loading ? "Processing..." : "Authorize Official Payment"}
                            </button>
                        </div>

                        <div className="bg-slate-100/50 rounded-xl p-5 border border-slate-200 flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-emerald-600" />
                            <div>
                                <h5 className="text-xs font-bold text-primary">Data Protection Guaranteed</h5>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Standard SSL Encryption Protocol</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
