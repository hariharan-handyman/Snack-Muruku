"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Settings,
    LogOut,
    ChevronRight,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: Package, label: "Products", href: "/admin/products" },
        { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    return (
        <div className="flex min-h-screen bg-background-alt">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } bg-secondary text-white transition-all duration-300 flex flex-col z-20`}
            >
                <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && "hidden"}`}>
                        <Image src="/logo.png" alt="Logo" width={24} height={24} />
                        <span className="font-sans font-bold text-lg uppercase tracking-widest text-white">Handyman</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 hover:bg-white/5 rounded-md text-slate-400 hover:text-white transition-colors"
                    >
                        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                <nav className="flex-1 py-10 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all group"
                        >
                            <item.icon size={20} className="min-w-[20px]" />
                            <span className={`${!isSidebarOpen && "hidden"} font-bold text-xs uppercase tracking-wider`}>{item.label}</span>
                            {isSidebarOpen && (
                                <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all">
                        <LogOut size={20} className="min-w-[20px]" />
                        <span className={`${!isSidebarOpen && "hidden"} font-bold text-xs uppercase tracking-wider`}>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Management Console</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[11px] font-bold text-primary uppercase tracking-wider">Operational Lead</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">System Admin</p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-primary font-bold text-xs">
                            AD
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
