import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-[#4E342E] text-[#FFF1DC] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-[#FFF1DC] bg-[#FFF1DC]">
                            <Image
                                src="/Logo2.png"
                                alt="Prasad Cold Coco Logo"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform"
                            />
                        </div>
                        <span className="font-bold text-2xl tracking-tight">
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
                        <Link href="/contact" className="hover:text-[#25D366] transition-colors font-medium">
                            Contact
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
