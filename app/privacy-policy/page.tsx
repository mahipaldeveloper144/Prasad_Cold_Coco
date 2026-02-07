import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#FFF1DC]">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-[#4E342E] mb-8">Privacy Policy</h1>
                <div className="prose prose-stone max-w-none text-[#4E342E]/80 space-y-6">
                    <p>Last Updated: February 7, 2026</p>
                    <p>At Prasad Cold Coco, we value your privacy. This policy explains how we handle your information when you use our website or order via WhatsApp.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">1. Information We Collect</h2>
                    <p>When you place an order via WhatsApp, we receive your phone number and any information you provide in the chat (name, address, etc.) to process your order.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">2. How We Use Your Information</h2>
                    <p>We use your information solely to fulfill your orders, communicate regarding delivery, and occasionally send updates about our products (if you opt-in).</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">3. Data Security</h2>
                    <p>We do not share your personal data with third parties except for delivery personnel required to fulfill your order.</p>

                    <h2 className="text-2xl font-bold text-[#4E342E]">4. Contact Us</h2>
                    <p>If you have questions about this policy, contact us at +91 90997 92454.</p>
                </div>
            </main>
        </div>
    );
}
