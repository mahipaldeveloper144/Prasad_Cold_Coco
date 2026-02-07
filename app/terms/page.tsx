import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-[#FFF1DC]">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-[#4E342E] mb-8">Terms & Conditions</h1>
                <div className="prose prose-stone max-w-none text-[#4E342E]/80 space-y-6">
                    <p>Last Updated: February 7, 2026</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">1. Introduction</h2>
                    <p>By using the Prasad Cold Coco website and placing an order via WhatsApp, you agree to comply with these terms and conditions.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">2. Ordering & Payment</h2>
                    <p>Orders are placed via WhatsApp. Prices are as listed on the website but subject to confirmation during the chat. Payment is typically required via digital methods (GPay/PhonePe) before dispatch for shipping orders.</p>

                    <h3 className="text-xl font-bold text-[#4E342E]">FSSAI Details</h3>
                    <p>Registration/License Number: [Registration-Number-Placeholder]</p>
                    <p>All our products are manufactured and handled according to food safety standards.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">3. Use of Products</h2>
                    <p>Our products are for personal consumption. Any resale without prior authorization is prohibited.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">4. Limitation of Liability</h2>
                    <p>Prasad Cold Coco is not liable for any allergic reactions if ingredients listed have not been reviewed by the customer.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">5. Jurisdiction</h2>
                    <p>These terms are governed by the laws of India, specifically within the jurisdiction of Ahmedabad, Gujarat.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
