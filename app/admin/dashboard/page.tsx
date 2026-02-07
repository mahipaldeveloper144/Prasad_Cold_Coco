import Link from "next/link";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { Plus, Edit, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

async function getProducts() {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
}

export default async function AdminDashboard() {
    const products = await getProducts();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Product Manager</h2>
                    <p className="text-gray-500">Manage your catalogue, prices, and stock.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-[#4E342E] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-[#3E2723] transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Product Name</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product: any) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{product.name}</div>
                                    <div className="text-xs text-gray-400">Ref: {product.refId}</div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700">₹{product.price}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${product.inStock
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-[#4E342E] hover:bg-[#4E342E]/5 rounded-md transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <form
                                            action={async () => {
                                                "use server";
                                                // Dynamic import to avoid circular dependencies if any, 
                                                // or just standard server action pattern.
                                                // Since we are in the same file as "use server", we need to be careful? 
                                                // Actually, this file is a Server Component, so we can import the server action from actions.ts
                                                const { deleteProduct } = await import("@/app/lib/actions");
                                                await deleteProduct(product._id);
                                            }}
                                        >
                                            <button
                                                type="submit"
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {products.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                    No products found. Add your first product!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
