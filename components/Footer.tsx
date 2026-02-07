import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#4E342E] text-[#FFF1DC]/60 py-20 px-4 sm:px-6 lg:px-8 border-t border-[#FFF1DC]/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
                    <div className="flex flex-col items-center sm:items-start space-y-6">
                        <div className="relative w-40 h-40 overflow-hidden p-1">
                            <Image
                                src="/logo-cream-nobg.png"
                                alt="Prasad Cold Coco Logo"
                                fill
                                className="object-cover p-1"
                            />
                        </div>
                        <div>
                            <h3 className="text-[#FFF1DC] font-bold text-xl mb-3 tracking-wide">Prasad Cold Coco</h3>
                            <p className="text-sm leading-relaxed max-w-xs">
                                Bringing the famous Surat taste from our facility in Ahmedabad. Authentic Cold Coco and pure Mango Pulp.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[#FFF1DC] font-bold text-lg mb-6 tracking-wide">Explore</h3>
                        <ul className="grid grid-cols-1 gap-3 text-sm">
                            <li><a href="/" className="hover:text-[#F7E3BA] transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-[#F7E3BA] rounded-full scale-0 group-hover:scale-100 transition-transform"></span> Home</a></li>
                            <li><a href="/#products" className="hover:text-[#F7E3BA] transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-[#F7E3BA] rounded-full scale-0 group-hover:scale-100 transition-transform"></span> Products</a></li>
                            <li><a href="/contact" className="hover:text-[#F7E3BA] transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-[#F7E3BA] rounded-full scale-0 group-hover:scale-100 transition-transform"></span> Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#FFF1DC] font-bold text-lg mb-6 tracking-wide">Customer Care</h3>
                        <ul className="grid grid-cols-1 gap-3 text-sm">
                            <li><a href="/privacy-policy" className="hover:text-[#F7E3BA] transition-all">Privacy Policy</a></li>
                            <li><a href="/refund-policy" className="hover:text-[#F7E3BA] transition-all">Refund Policy</a></li>
                            <li><a href="/shipping-policy" className="hover:text-[#F7E3BA] transition-all">Shipping Policy</a></li>
                            <li><a href="/terms" className="hover:text-[#F7E3BA] transition-all">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#FFF1DC] font-bold text-lg mb-6 tracking-wide">Visit Us</h3>
                        <p className="text-sm leading-6">Nikol, Ahmedabad,<br />Gujarat, India.</p>
                        <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-[#F7E3BA]/30 transition-colors">
                            <p className="text-[#FFF1DC] font-bold text-sm mb-1 group-hover:text-[#F7E3BA] transition-colors">WhatsApp Order</p>
                            <a href="https://wa.me/919099792454" className="text-sm text-[#F7E3BA] font-medium">+91 90997 92454</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#FFF1DC]/5 mt-20 pt-10 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] font-medium opacity-40 hover:opacity-100 transition-opacity">
                        © {new Date().getFullYear()} Prasad Cold Coco • Handcrafted with ❤️ in Ahmedabad
                    </p>
                </div>
            </div>
        </footer>
    );
}
