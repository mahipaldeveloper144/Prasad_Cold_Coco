import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { updateProduct } from "@/app/lib/actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProductPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id).lean();

    if (!product) {
        notFound();
    }

    // Wrap the server action to include the ID
    const updateProductWithId = updateProduct.bind(null, id);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/dashboard"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            </div>

            <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
                <form action={updateProductWithId} className="space-y-8">
                    {/* Basic Info Section */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#4E342E] border-b pb-2">Basic Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                name="name"
                                type="text"
                                defaultValue={product.name}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Reference ID (Unique SKU) *
                                </label>
                                <input
                                    name="refId"
                                    type="text"
                                    defaultValue={product.refId}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={product.price}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                name="category"
                                defaultValue={product.category}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            >
                                <option value="Coco">Cold Coco</option>
                                <option value="Mango">Mango Pulp</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL *
                            </label>
                            <input
                                name="image"
                                type="url"
                                defaultValue={product.image}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Short Description *
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                required
                                defaultValue={product.description}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Ecommerce Details Section */}
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-[#4E342E] border-b pb-2">Ecommerce Details</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ingredients
                            </label>
                            <textarea
                                name="ingredients"
                                rows={2}
                                defaultValue={product.ingredients}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preparation Instructions
                            </label>
                            <textarea
                                name="instructions"
                                rows={2}
                                defaultValue={product.instructions}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* SEO Section */}
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-semibold text-[#4E342E] border-b pb-2">SEO Optimization (Metadata)</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SEO Title
                            </label>
                            <input
                                name="seoTitle"
                                type="text"
                                defaultValue={product.seoTitle}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SEO Description
                            </label>
                            <textarea
                                name="seoDescription"
                                rows={2}
                                defaultValue={product.seoDescription}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SEO Keywords
                            </label>
                            <input
                                name="seoKeywords"
                                type="text"
                                defaultValue={product.seoKeywords}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Visibility Section */}
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <input
                                name="inStock"
                                type="checkbox"
                                defaultChecked={product.inStock}
                                id="inStock"
                                className="w-5 h-5 text-[#4E342E] border-gray-300 rounded focus:ring-[#4E342E]"
                            />
                            <label htmlFor="inStock" className="text-sm font-medium text-gray-700 select-none">
                                In Stock (Available for ordering)
                            </label>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#4E342E] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#3E2723] transition-colors flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
