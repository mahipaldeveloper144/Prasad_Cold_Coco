import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import connectDB from "@/lib/mongodb";
import Product, { IProduct } from "@/models/Product";

// Ensure DB connection once (Server Component optimization)
// connectDB(); // In a server component, we call it inside the function or it runs on import if top-level called? 
// Better to call it inside.

async function getProducts() {
    await connectDB();
    // Lean queries are faster and return POJOs instead of Mongoose Documents
    const products = await Product.find({ inStock: true }).lean();

    // Serialize for client component: convert _id and dates to string
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

export const dynamic = "force-dynamic"; // Ensure fresh data on every request (important for price changes)

export default async function Home() {
    const products = await getProducts();

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
                    Authentic Surat Delicacies
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
            <section className="bg-white py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#4E342E] text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-[#4E342E] mb-2">How do I order from Prasad Cold Coco?</h3>
                            <p className="text-[#4E342E]/70">Simply click the "Order on WhatsApp" button on any product. It will open a chat with us with your order details pre-filled. We will then confirm the delivery charges and share payment details.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-[#4E342E] mb-2">Do you ship outside Surat?</h3>
                            <p className="text-[#4E342E]/70">Yes! We ship our Cold Coco Powder pan-India. Fresh Mango Pulp and ready-to-drink Cold Coco are currently available for delivery within Surat only.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-[#4E342E] mb-2">How long does the Coco Powder last?</h3>
                            <p className="text-[#4E342E]/70">Our Cold Coco Powder has a shelf life of 6 months when stored in a cool, dry place.</p>
                        </div>
                    </div>
                </div>
                {/* FAQ Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "How do I order from Prasad Cold Coco?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Simply click the 'Order on WhatsApp' button on any product. It will open a chat with us with your order details pre-filled."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Do you ship outside Surat?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Yes! We ship our Cold Coco Powder pan-India. Fresh items are Surat-only."
                                    }
                                }
                            ]
                        })
                    }}
                />
            </section>

            {/* Footer */}
            <footer className="bg-[#4E342E] text-[#FFF1DC]/60 py-16 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    <div>
                        <h3 className="text-[#FFF1DC] font-bold text-lg mb-4">Prasad Cold Coco</h3>
                        <p className="text-sm">Authentic Surat taste, delivered fresh to your doorstep. Famous for our creamy Cold Coco and pure Mango Pulp.</p>
                    </div>
                    <div>
                        <h3 className="text-[#FFF1DC] font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-[#25D366] transition-colors">Home</a></li>
                            <li><a href="#products" className="hover:text-[#25D366] transition-colors">Products</a></li>
                            <li><a href="/privacy-policy" className="hover:text-[#25D366] transition-colors">Privacy Policy</a></li>
                            <li><a href="/refund-policy" className="hover:text-[#25D366] transition-colors">Refund Policy</a></li>
                            <li><a href="/shipping-policy" className="hover:text-[#25D366] transition-colors">Shipping Policy</a></li>
                            <li><a href="/contact" className="hover:text-[#25D366] transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#FFF1DC] font-bold text-lg mb-4">Contact</h3>
                        <p className="text-sm">Surat, Gujarat, India.</p>
                        <p className="text-sm mt-2">WhatsApp: +91 90997 92454</p>
                    </div>
                </div>
                <div className="border-t border-[#FFF1DC]/10 mt-12 pt-8 text-center text-sm">
                    <p>© {new Date().getFullYear()} Prasad Cold Coco. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
