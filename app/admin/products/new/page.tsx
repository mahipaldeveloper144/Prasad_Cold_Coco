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
                <form action={createProduct} className="space-y-6">
                    {/* Product Name */}
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

                    {/* Reference ID (SKU) */}
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

                    {/* Price */}
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

                    {/* Category */}
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

                    {/* Image URL */}
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
                        <p className="text-xs text-gray-500 mt-1">
                            For Phase 1, paste a direct image link (e.g. from Imgur or Cloudinary).
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            placeholder="Describe the taste, ingredients, and usage..."
                        ></textarea>
                    </div>

                    {/* In Stock Toggle */}
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

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
