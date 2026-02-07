import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-[#FFF1DC]">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-[#4E342E] mb-8">Refund & Cancellation Policy</h1>
                <div className="prose prose-stone max-w-none text-[#4E342E]/80 space-y-6">
                    <p>Last Updated: February 7, 2026</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">1. Cancellations</h2>
                    <p>Orders can only be cancelled before they are dispatched. Once an order is shipped, cancellation is not possible due to the perishable nature of our products.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">2. Refunds</h2>
                    <p>Refunds are only issued if the product received is damaged or expired at the time of delivery. You must provide photo evidence via WhatsApp within 2 hours of delivery.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">3. Processing</h2>
                    <p>Approved refunds will be processed via your original payment method (GPay/PhonePe) within 2-3 business days.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
