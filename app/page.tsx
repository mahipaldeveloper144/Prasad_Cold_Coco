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

            {/* Footer */}
            <footer className="bg-[#4E342E] text-[#FFF1DC]/60 py-12 text-center text-sm">
                <p>© {new Date().getFullYear()} Prasad Cold Coco. All rights reserved.</p>
                <p className="mt-2">Surat, Gujarat, India.</p>
            </footer>
        </main>
    );
}
