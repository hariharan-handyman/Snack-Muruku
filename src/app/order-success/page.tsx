"use client";

import { useSearchParams } from "next/navigation";
import {
    CheckCircle2,
    Package,
    Truck,
    ArrowRight,
    Heart
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full bg-white rounded-[60px] p-12 text-center border border-gray-100 shadow-2xl shadow-primary/10 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

            <div className="mb-10 inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full">
                <CheckCircle2 size={48} />
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-black text-secondary mb-4 leading-tight">
                Order Confirmed!
            </h1>
            <p className="text-lg text-secondary/50 font-medium mb-10 italic">
                "5 Generations of Taste are now on the way to you."
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-left">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                        <Package size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">Order ID</span>
                    </div>
                    <div className="text-xl font-bold text-secondary">#HN-{id?.padStart(4, "0")}</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-left">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                        <Truck size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">Expected Arrival</span>
                    </div>
                    <div className="text-xl font-bold text-secondary">2-3 Business Days</div>
                </div>
            </div>

            <div className="space-y-4">
                <Link href="/shop" className="w-full flex items-center justify-center gap-3 py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30">
                    Continue Heritage Shopping <ArrowRight size={20} />
                </Link>
                <div className="flex items-center justify-center gap-2 text-secondary/40 text-sm font-bold uppercase tracking-widest pt-4">
                    <Heart size={16} className="text-primary" /> Powered by Her Hands
                </div>
            </div>

            <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-1" />
        </motion.div>
    );
}

export default function OrderSuccess() {
    return (
        <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center p-6">
            <Suspense fallback={<div className="font-serif animate-pulse text-secondary text-2xl">Preparing your confirmation...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
