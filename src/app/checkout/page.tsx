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
            // Simulate/Call shipping calculation API
            try {
                const res = await fetch("/api/shipping/calculate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pincode: formData.pincode, weight: totalWeight }),
                });
                const data = await res.json();
                // For demo/sim, using a mock flat fee if API not ready, else actual data
                setShippingCost(data.cost || 100);
            } catch (e) {
                setShippingCost(100);
            }
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        // 1. Create Order in Razorpay & Database
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

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: "INR",
                name: "HANDYMAN",
                description: "Heritage Snack Order",
                order_id: orderData.id,
                handler: async (response: any) => {
                    // 3. Verify Payment
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
                theme: { color: "#C58E1A" },
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
        <div className="min-h-screen bg-[#F9F6F0]">
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <Link href="/shop" className="inline-flex items-center gap-2 text-secondary/60 hover:text-primary font-bold mb-12 transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Delicacies
                </Link>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Form Side */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-sm">
                            <header className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-secondary font-serif">Shipping Details</h2>
                                    <p className="text-sm text-secondary/40">Where should we deliver your heritage packs?</p>
                                </div>
                            </header>

                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-secondary/50">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Hariharan"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold text-secondary transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-secondary/50">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="name@example.com"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold text-secondary transition-all"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-secondary/50">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold text-secondary transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-secondary/50">Complete Address</label>
                                    <textarea
                                        rows={3}
                                        placeholder="House No, Street, Landmark..."
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold text-secondary transition-all resize-none"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-secondary/50">Pincode</label>
                                        <input
                                            type="text"
                                            placeholder="641028"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold text-secondary transition-all"
                                            value={formData.pincode}
                                            onBlur={handlePincodeBlur}
                                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-secondary/50">City</label>
                                        <input
                                            type="text"
                                            placeholder="Coimbatore"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold text-secondary transition-all"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-secondary/50">State</label>
                                        <input
                                            type="text"
                                            placeholder="Tamil Nadu"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold text-secondary transition-all"
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Side */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-secondary text-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-secondary/30 relative overflow-hidden">
                            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[150%] bg-primary/10 rotate-12 blur-[80px]" />

                            <h3 className="text-2xl font-serif font-bold mb-8 relative z-10 flex items-center gap-3">
                                Order Summary <span className="text-primary text-xs bg-primary/20 px-3 py-1 rounded-full uppercase italic tracking-widest">Heritage Pack</span>
                            </h3>

                            <div className="space-y-6 mb-8 relative z-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 bg-white/10 rounded-2xl relative overflow-hidden flex-shrink-0 border border-white/10">
                                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-white/40">{item.quantity} x ₹{item.price}</p>
                                        </div>
                                        <div className="font-serif font-bold">₹{item.price * item.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-white/10 pt-8 relative z-10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/40 font-bold uppercase tracking-widest">Subtotal</span>
                                    <span className="font-bold">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/40 font-bold uppercase tracking-widest">Shipping Fee</span>
                                    <span className="font-bold">₹{shippingCost}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <span className="text-xl font-serif font-black italic uppercase tracking-tighter">Total</span>
                                    <div className="text-right">
                                        <div className="text-3xl font-serif font-black text-primary">₹{total}</div>
                                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Global Express Weight: {(totalWeight + 500) / 1000}kg</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading || cart.length === 0}
                                className="w-full mt-10 py-5 bg-white text-secondary font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all transform active:scale-95 disabled:opacity-50 group"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Lock size={20} className="text-primary group-hover:text-white" />}
                                {loading ? "Initializing..." : "Proceed to Secure Payment"}
                                <ChevronRight size={18} className="text-primary group-hover:text-white" />
                            </button>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-gray-100 flex items-center gap-4">
                            <ShieldCheck className="w-8 h-8 text-green-500" />
                            <div>
                                <h5 className="text-sm font-bold text-secondary">Secure Transaction</h5>
                                <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest">256-bit SSL Encrypted • Razorpay Secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 142, 26, 0.3);
          border-radius: 10px;
        }
      `}</style>
        </div>
    );
}
