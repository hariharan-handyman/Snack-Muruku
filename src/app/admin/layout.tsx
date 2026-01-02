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
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } bg-secondary text-white transition-all duration-300 flex flex-col z-20`}
            >
                <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && "hidden"}`}>
                        <Image src="/logo.png" alt="Logo" width={32} height={32} />
                        <span className="font-serif font-bold text-xl uppercase tracking-wider text-primary">Handyman</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-white/10 rounded-lg"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 py-10 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/20 hover:text-primary transition-all group"
                        >
                            <item.icon size={22} className="min-w-[22px]" />
                            <span className={`${!isSidebarOpen && "hidden"} font-medium`}>{item.label}</span>
                            {isSidebarOpen && (
                                <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-4 p-3 w-full rounded-xl hover:bg-accent/20 hover:text-accent transition-all">
                        <LogOut size={22} className="min-w-[22px]" />
                        <span className={`${!isSidebarOpen && "hidden"} font-medium`}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
                    <h2 className="text-xl font-bold text-secondary font-serif">Admin Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-secondary">Admin User</p>
                            <p className="text-xs text-secondary/50">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
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
