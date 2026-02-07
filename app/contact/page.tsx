import Navbar from "@/components/Navbar";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#FFF1DC]">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-[#4E342E] mb-8 text-center">Contact Us</h1>
                <p className="text-center text-[#4E342E]/70 mb-12 max-w-2xl mx-auto">
                    Have questions about our products or want to place a bulk order? Reach out to us via any of the channels below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="bg-[#25D366]/10 p-4 rounded-full mb-4">
                            <MessageCircle className="w-8 h-8 text-[#25D366]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#4E342E] mb-2">WhatsApp</h3>
                        <p className="text-[#4E342E]/70 mb-4">Fastest way to order and get support.</p>
                        <a
                            href="https://wa.me/919099792454"
                            target="_blank"
                            className="text-[#25D366] font-bold hover:underline"
                        >
                            +91 90997 92454
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="bg-[#4E342E]/10 p-4 rounded-full mb-4">
                            <MapPin className="w-8 h-8 text-[#4E342E]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#4E342E] mb-2">Our Location</h3>
                        <p className="text-[#4E342E]/70">Surat, Gujarat, India.</p>
                        <p className="text-xs mt-2 text-[#4E342E]/50">Authentic taste since generations.</p>
                    </div>
                </div>

                <div className="mt-12 bg-[#4E342E] text-[#FFF1DC] p-12 rounded-3xl text-center">
                    <h2 className="text-2xl font-bold mb-4">Bulk Orders & Catering</h2>
                    <p className="mb-8 opacity-90">We cater to weddings, parties, and corporate events. Contact us for special pricing on bulk quantities.</p>
                    <a
                        href="https://wa.me/919099792454?text=Hi, I am interested in a bulk order."
                        className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all inline-block"
                    >
                        Enquire for Bulk Order
                    </a>
                </div>
            </main>
        </div>
    );
}
