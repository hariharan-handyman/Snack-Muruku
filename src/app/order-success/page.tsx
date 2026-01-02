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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl w-full bg-white rounded-xl p-10 text-center border border-slate-200 shadow-sm relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full">
                <CheckCircle2 size={40} />
            </div>

            <h1 className="text-3xl font-bold text-primary mb-3 tracking-tight">
                Order Confirmed
            </h1>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-[0.2em] mb-10">
                Official Transaction Verified
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-left">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                        <Package size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Tracking Number</span>
                    </div>
                    <div className="text-lg font-bold text-primary">#HN-{id?.padStart(4, "0")}</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-left">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                        <Truck size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Fulfillment Time</span>
                    </div>
                    <div className="text-lg font-bold text-primary">2-3 Business Days</div>
                </div>
            </div>

            <div className="space-y-4">
                <Link href="/shop" className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-lg hover:bg-slate-800 transition-all">
                    Return to Product Line <ArrowRight size={18} />
                </Link>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4">
                    Quality Standardized • Handyman Technologies
                </p>
            </div>
        </motion.div>
    );
}

export default function OrderSuccess() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <Suspense fallback={<div className="font-bold animate-pulse text-primary tracking-widest text-xs uppercase">Verifying Confirmation...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
