import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

// Mock Data for Phase 1
const PRODUCTS = [
    {
        id: "1",
        name: "Surat Famous Cold Coco Powder (500g)",
        description: "The original authentic taste of Surat. Made with premium cocoa and secret spices. Perfect for making thick, creamy cold coco at home.",
        price: 350,
        image: "https://placehold.co/600x400/4E342E/FFF1DC/png?text=Cold+Coco+Powder",
        refId: "COCO-500G",
    },
    {
        id: "2",
        name: "Premium Mango Pulp (Kesar) - 850g Tin",
        description: "Pure Kesar Mango pulp with no added preservatives. Enjoy the taste of summer all year round. Export quality sweetness.",
        price: 220,
        image: "https://placehold.co/600x400/FFB300/4E342E/png?text=Mango+Pulp",
        refId: "MANGO-850G",
    },
    {
        id: "3",
        name: "Cold Coco Family Pack (1kg)",
        description: "Double the quantity for big families. Save more with our 1kg value pack. Makes up to 20 glasses of thick coco.",
        price: 650,
        image: "https://placehold.co/600x400/3E2723/FFF1DC/png?text=Family+Pack+1kg",
        refId: "COCO-1KG",
    },
];

export default function Home() {
    return (
        <main className="min-h-screen bg-[#FFF1DC]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-[#4E342E] text-[#FFF1DC] py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="relative max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">
                        The Taste of <span className="text-[#25D366]">Surat</span>
                    </h1>
                    <p className="text-xl sm:text-2xl mb-10 text-[#FFF1DC]/90 font-light">
                        Order authentic Cold Coco Powder & Mango Pulp directly to your doorstep via WhatsApp.
                    </p>
                    <a
                        href="#products"
                        className="inline-block bg-[#FFF1DC] text-[#4E342E] font-bold text-lg px-8 py-4 rounded-full hover:bg-white hover:shadow-lg transition-transform hover:-translate-y-1"
                    >
                        View Products
                    </a>
                </div>
            </section>

            {/* Products Grid */}
            <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-[#4E342E] text-center mb-12 flex items-center justify-center gap-3">
                    <span className="w-12 h-1 bg-[#4E342E] rounded-full"></span>
                    Our Products
                    <span className="w-12 h-1 bg-[#4E342E] rounded-full"></span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#4E342E] text-[#FFF1DC]/60 py-12 text-center text-sm">
                <p>© {new Date().getFullYear()} Prasad Cold Coco. All rights reserved.</p>
                <p className="mt-2">Surat, Gujarat, India.</p>
            </footer>
        </main>
    );
}
