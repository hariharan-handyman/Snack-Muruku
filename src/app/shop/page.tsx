"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    Search,
    Heart,
    ShoppingCart,
    Filter,
    Star,
    Plus,
    ArrowRight,
    ChevronDown
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Shop() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .finally(() => setLoading(false));

        updateCartCount();
    }, []);

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(cart.reduce((acc: number, item: any) => acc + item.quantity, 0));
    };

    const addToCart = (product: any) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existing = cart.find((item: any) => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    };

    const categories = ["All", "Savories", "Sweets", "Traditional Mix", "Gift Boxes"];

    const filteredProducts = products.filter(p =>
        (category === "All" || p.category === category) &&
        (p.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-background-alt font-sans">
            {/* Standard Corporate Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Logo" width={32} height={32} />
                        <span className="text-xl font-bold tracking-tight text-primary uppercase">HANDYMAN</span>
                    </Link>

                    <div className="hidden md:flex flex-1 max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Find products by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-1 focus:ring-slate-300 transition-all text-sm text-primary placeholder:text-slate-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/checkout" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all">
                            <ShoppingCart size={18} />
                            <span className="hidden sm:inline">Checkout</span>
                            <span className="bg-white/20 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center ml-1">{cartCount}</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Category Filtering */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all border ${category === cat
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Displaying {filteredProducts.length} Results
                    </div>
                </div>

                {/* Subdued Banner */}
                <div className="mb-10 py-10 px-8 rounded-xl bg-primary text-white border border-slate-800">
                    <h2 className="text-3xl font-bold mb-2 tracking-tight">
                        {category === "All" ? "Full Product Line" : category}
                    </h2>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-0">
                        Professional Distribution • Quality Assurance • Micro-Entrepreneur Empowerment
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-xl h-[380px] animate-pulse border border-slate-200" />
                            ))
                        ) : filteredProducts.length === 0 ? (
                            <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No items match your current filter.</p>
                            </div>
                        ) : filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col pro-card"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100">
                                    {product.imageUrl && (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary rounded px-2 py-1 text-[9px] font-bold uppercase tracking-widest border border-slate-200">
                                        Verified
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{product.category}</span>
                                            <span className="text-accent text-[9px] font-bold uppercase tracking-widest">In Stock</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-primary mb-1 tracking-tight line-clamp-1">{product.name}</h3>
                                        <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed h-10">
                                            {product.description || "Standard heritage production unit."}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Net Weight: {product.weight}g</span>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="p-2.5 bg-slate-50 border border-slate-200 text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* Professional Footer */}
            <footer className="py-12 bg-white border-t border-slate-200 text-center">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                    Quality Standardized • Global Logistics • Handyman Technologies
                </p>
                <div className="flex flex-col gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <a href="tel:+919042387152" className="hover:text-primary transition-colors">+91 9042387152</a>
                    <a href="mailto:handyman.tech.in@gmail.com" className="hover:text-primary transition-colors">handyman.tech.in@gmail.com</a>
                </div>
            </footer>
        </div>
    );
}

function ShieldCheck({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>;
}
