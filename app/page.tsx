import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import connectDB from "@/lib/mongodb";
import Product, { IProduct } from "@/models/Product";
import Footer from "@/components/Footer";

// Ensure DB connection once (Server Component optimization)
// connectDB(); // In a server component, we call it inside the function or it runs on import if top-level called? 
// Better to call it inside.

import FAQAccordion from "@/components/FAQAccordion";
import FAQ from "@/models/FAQ";

async function getProducts() {
    await connectDB();
    const products = await Product.find({ inStock: true }).lean();
    return products.map((product: any) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        refId: product.refId,
        ingredients: product.ingredients,
        instructions: product.instructions,
    }));
}

async function getFAQs() {
    await connectDB();
    const faqs = await FAQ.find({}).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(faqs));
}

export const dynamic = "force-dynamic";

export default async function Home() {
    const products = await getProducts();
    const faqs = await getFAQs();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <main className="min-h-screen bg-[#FFF1DC]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-[#4E342E] text-[#FFF1DC] py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="relative max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">
                        Surat's Famous <span className="text-[#25D366]">Cold Coco</span>
                    </h1>
                    <p className="text-xl sm:text-2xl mb-10 text-[#FFF1DC]/90 font-light">
                        Bringing the authentic Surat taste to your home. Manufactured in Nikol, Ahmedabad.
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
                    Premium Product Range
                    <span className="w-12 h-1 bg-[#4E342E] rounded-full"></span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.length > 0 ? (
                        products.map((product) => {
                            const productJsonLd = {
                                "@context": "https://schema.org",
                                "@type": "Product",
                                "name": product.name,
                                "description": product.description,
                                "image": product.image,
                                "offers": {
                                    "@type": "Offer",
                                    "price": product.price,
                                    "priceCurrency": "INR",
                                    "availability": "https://schema.org/InStock",
                                    "url": `https://prasadcoldcoco.in/#products`
                                }
                            };
                            return (
                                <div key={product.id}>
                                    <script
                                        type="application/ld+json"
                                        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
                                    />
                                    <ProductCard product={product} />
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center col-span-full text-[#4E342E]/50">
                            No products available right now. Check back later!
                        </p>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-20 bg-gradient-to-b from-white to-[#FFF1DC]/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#4E342E] mb-4 tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-[#4E342E]/60 max-w-2xl mx-auto text-lg italic">Everything you need to know about our products, shipping, and order process.</p>
                    </div>

                    {faqs.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <FAQAccordion faqs={faqs.slice(0, Math.ceil(faqs.length / 2))} />
                            </div>
                            <div className="space-y-4">
                                <FAQAccordion faqs={faqs.slice(Math.ceil(faqs.length / 2))} />
                            </div>
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                            />
                        </div>
                    ) : (
                        <div className="text-center py-10 opacity-50 italic">
                            FAQs are being updated...
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
