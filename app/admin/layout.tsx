"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutDashboard, ShoppingBag, HelpCircle, Menu, X, ChevronRight } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Products", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-[#FFF1DC]/10">
                <Link href="/" className="group">
                    <h1 className="text-xl font-bold group-hover:text-[#F7E3BA] transition-colors">Admin Panel</h1>
                    <p className="text-xs opacity-70">Prasad Cold Coco</p>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${isActive
                                ? "bg-[#FFF1DC] text-[#4E342E] shadow-lg shadow-black/20"
                                : "hover:bg-[#FFF1DC]/10 text-[#FFF1DC]"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={`w-5 h-5 ${isActive ? "text-[#4E342E]" : "group-hover:text-[#F7E3BA]"}`} />
                                {link.name}
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4" />}
                        </Link>
                    );
                })}
                <div className="pt-4 px-4">
                    <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Coming Soon</p>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium opacity-30 cursor-not-allowed text-left bg-black/10 rounded-lg">
                        <ShoppingBag className="w-5 h-5" />
                        Orders
                    </button>
                </div>
            </nav>

            <div className="p-4 border-t border-[#FFF1DC]/10">
                <LogoutButton
                    onLogout={async () => {
                        const { signOut } = await import("next-auth/react");
                        await signOut({ callbackUrl: "/admin/login" });
                    }}
                />
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="w-72 bg-[#4E342E] text-[#FFF1DC] hidden lg:flex flex-col shadow-2xl z-20">
                <SidebarContent />
            </aside>

            {/* Mobile Header */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="lg:hidden bg-[#4E342E] text-[#FFF1DC] h-16 flex items-center px-4 justify-between shadow-md z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-bold tracking-tight">Admin Dashboard</span>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-gray-50 relative">
                    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-80 bg-[#4E342E] text-[#FFF1DC] z-[101] lg:hidden shadow-2xl shadow-black/50"
                        >
                            <div className="absolute top-4 right-4 lg:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
