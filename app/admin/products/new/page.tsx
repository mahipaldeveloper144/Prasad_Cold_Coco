"use client";

import { createProduct } from "@/app/lib/actions";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-[#4E342E] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#3E2723] disabled:opacity-50 transition-colors flex items-center gap-2"
        >
            <Save className="w-5 h-5" />
            {pending ? "Saving..." : "Save Product"}
        </button>
    );
}

export default function AddProductPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/dashboard"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <form action={createProduct} className="space-y-8">
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
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                placeholder="e.g. Surat Cold Coco Premium"
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
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                    placeholder="e.g. COCO-PREM-500"
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
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                    placeholder="350"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                name="category"
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
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                placeholder="https://i.imgur.com/..."
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                placeholder="Brief summary of the product..."
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                placeholder="Coco powder, sugar, milk..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preparation Instructions
                            </label>
                            <textarea
                                name="instructions"
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                placeholder="Mix with hot milk and chill..."
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                placeholder="Leave blank to use product name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SEO Description
                            </label>
                            <textarea
                                name="seoDescription"
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                placeholder="Meta description for search engines (max 160 characters)"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SEO Keywords
                            </label>
                            <input
                                name="seoKeywords"
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                                placeholder="cold coco, surat coco, aam ras..."
                            />
                        </div>
                    </div>

                    {/* Visibility Section */}
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <input
                                name="inStock"
                                type="checkbox"
                                defaultChecked
                                id="inStock"
                                className="w-5 h-5 text-[#4E342E] border-gray-300 rounded focus:ring-[#4E342E]"
                            />
                            <label htmlFor="inStock" className="text-sm font-medium text-gray-700 select-none">
                                In Stock (Available for ordering)
                            </label>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
