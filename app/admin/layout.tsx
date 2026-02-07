import Link from "next/link";
import { LogOut, LayoutDashboard, ShoppingBag } from "lucide-react";
import { signOut } from "@/auth";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#4E342E] text-[#FFF1DC] hidden md:flex flex-col">
                <div className="p-6 border-b border-[#FFF1DC]/10">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                    <p className="text-xs opacity-70">Prasad Cold Coco</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 bg-[#FFF1DC]/10 rounded-lg text-sm font-medium hover:bg-[#FFF1DC]/20 transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-[#FFF1DC]/20 rounded-lg transition-colors opacity-50 cursor-not-allowed">
                        <ShoppingBag className="w-5 h-5" />
                        Orders (Coming Soon)
                    </button>
                </nav>

                <div className="p-4 border-t border-[#FFF1DC]/10">
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/admin/login" });
                        }}
                    >
                        <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-300 hover:text-red-100 w-full hover:bg-red-900/20 rounded-lg transition-colors">
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white shadow-sm h-16 flex items-center px-8 justify-between md:hidden">
                    <span className="font-bold text-[#4E342E]">Admin Panel</span>
                    {/* Mobile menu trigger could go here */}
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
