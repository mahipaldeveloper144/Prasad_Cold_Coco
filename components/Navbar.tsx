import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-[#4E342E] text-[#FFF1DC] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-[#FFF1DC] p-1.5 rounded-full group-hover:rotate-12 transition-transform">
                            <Coffee className="w-6 h-6 text-[#4E342E]" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">
                            Prasad Cold Coco
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="hover:text-[#25D366] transition-colors font-medium">
                            Home
                        </Link>
                        <Link href="#products" className="hover:text-[#25D366] transition-colors font-medium">
                            Products
                        </Link>
                        <Link href="#about" className="hover:text-[#25D366] transition-colors font-medium">
                            About
                        </Link>
                    </div>

                    {/* Mobile Menu Button - Placeholder */}
                    <div className="md:hidden">
                        {/* Can add hamburger menu later */}
                    </div>
                </div>
            </div>
        </nav>
    );
}
