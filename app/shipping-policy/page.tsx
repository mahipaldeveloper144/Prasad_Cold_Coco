import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPolicy() {
    return (
        <div className="min-h-screen bg-[#FFF1DC]">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-[#4E342E] mb-8">Shipping & Delivery Policy</h1>
                <div className="prose prose-stone max-w-none text-[#4E342E]/80 space-y-6">
                    <p>Last Updated: February 7, 2026</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">1. Delivery Areas</h2>
                    <p>We currently deliver across Ahmedabad and ship our powder products pan-India. Fresh items are only available for local delivery in Ahmedabad.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">2. Timelines</h2>
                    <p>Local Delivery (Ahmedabad): Same day or Next day.<br />Pan-India Shipping: 3-5 business days depending on location.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">3. Shipping Charges</h2>
                    <p>Shipping charges are calculated based on your location and weight of the order. These will be shared with you during our WhatsApp conversation before payment.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
