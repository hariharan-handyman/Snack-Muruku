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
        <div className="min-h-screen bg-[#F9F6F0]">
            {/* Premium Header */}
            <header className="bg-white border-b border-primary/10 sticky top-0 z-40 transition-shadow duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-6">
                    <Link href="/" className="flex items-center gap-2 min-w-fit">
                        <Image src="/logo.png" alt="Logo" width={40} height={40} />
                        <span className="font-serif font-bold text-2xl text-secondary">HANDYMAN</span>
                    </Link>

                    <div className="hidden md:flex flex-1 max-w-xl relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                        <input
                            type="text"
                            placeholder="Search for traditional Muruku, Sweets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-primary/5 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-secondary"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-3 hover:bg-primary/10 rounded-full transition-colors relative group">
                            <Heart className="w-6 h-6 text-secondary group-hover:text-primary transition-colors" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                        </button>
                        <Link href="/checkout" className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-2xl font-bold hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/20">
                            <ShoppingCart size={20} className="text-primary" />
                            <span className="hidden sm:inline">Cart</span>
                            <span className="bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold tracking-tighter">{cartCount}</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                {/* Category Pills - Zomato Style */}
                <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all border ${category === cat
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                                : "bg-white text-secondary border-gray-100 hover:border-primary/30"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Hero Banner for Category */}
                <div className="mb-12 relative h-48 md:h-64 rounded-[40px] overflow-hidden bg-secondary">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent z-10 p-12 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-5xl font-serif font-black text-white italic mb-2 tracking-tight">
                            {category === "All" ? "Heritage Delicacies" : category}
                        </h2>
                        <p className="text-primary/80 font-bold uppercase tracking-widest text-xs">
                            5 Generations of Authenticity • Powered by Her Hands
                        </p>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-primary/20 rotate-12 blur-[80px]" />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-[40px] h-[400px] animate-pulse border border-gray-100" />
                            ))
                        ) : filteredProducts.length === 0 ? (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-2xl font-serif italic text-secondary/40">No delicacies found in this collection...</p>
                            </div>
                        ) : filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-[40px] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all group flex flex-col"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                    {product.imageUrl && (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    )}
                                    <motion.button
                                        whileTap={{ scale: 1.2 }}
                                        className="absolute top-5 right-5 p-3 bg-white/80 backdrop-blur-md rounded-full text-secondary hover:text-primary transition-colors shadow-lg"
                                    >
                                        <Heart size={20} />
                                    </motion.button>
                                    <div className="absolute bottom-5 left-5 bg-secondary/80 backdrop-blur-md text-white rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-white/10">
                                        <Star size={10} className="fill-primary text-primary" /> 4.9 Best Seller
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-secondary/40 text-[10px] font-black uppercase tracking-widest">{product.category}</span>
                                            <div className="flex gap-1">
                                                <ShieldCheck className="w-3 h-3 text-primary" />
                                                <span className="text-[8px] font-bold text-primary italic uppercase underline">Hygienic</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-secondary font-serif mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                                        <p className="text-xs text-secondary/50 font-medium mb-4 line-clamp-2 leading-relaxed italic">
                                            {product.description || "A time-honored recipe passed through 5 generations of heritage snack making."}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 bg-primary/5 p-4 rounded-3xl border border-primary/10">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-secondary/30 uppercase tracking-tighter">Premium Unit</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-black text-secondary font-serif">₹{product.price}</span>
                                                <span className="text-[10px] font-bold text-secondary/40 italic">/{product.weight}g</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="p-4 bg-primary text-white rounded-2xl hover:scale-110 transition-all shadow-lg shadow-primary/30 group/btn"
                                        >
                                            <Plus size={24} className="group-hover/btn:rotate-90 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            {/* Quick Footer for Shop */}
            <footer className="py-12 border-t border-primary/5 text-center text-secondary/30 font-serif italic text-sm">
                Premium Heritage Snacks • Powered by Her Hands • Express Global Shipping
            </footer>

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
}

function ShieldCheck({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>;
}
