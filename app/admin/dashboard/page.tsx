import Link from "next/link";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { Plus, Edit, ShoppingBag } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500 font-bold tracking-widest">
                                <th className="px-6 py-5">Product</th>
                                <th className="px-6 py-5">Price</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 uppercase text-xs">
                            {products.map((product: any) => (
                                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 mb-0.5">{product.name}</div>
                                                <div className="text-[10px] text-gray-400 font-medium">REF: {product.refId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-700">₹{product.price}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${product.inStock
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            <span className={`w-1 h-1 rounded-full mr-1.5 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/admin/products/${product._id}/edit`}
                                                className="p-2 text-gray-400 hover:text-[#4E342E] hover:bg-[#4E342E]/5 rounded-xl transition-all"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <DeleteButton
                                                itemName={product.name}
                                                onDelete={async () => {
                                                    "use server"
                                                    const { deleteProduct } = await import("@/app/lib/actions");
                                                    await deleteProduct(product._id);
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <ShoppingBag className="w-10 h-10 text-gray-200" />
                                            <p className="text-gray-400 font-medium">No products found. Add your first product!</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
