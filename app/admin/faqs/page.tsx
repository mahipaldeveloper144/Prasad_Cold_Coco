import Link from "next/link";
import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import { PlusCircle, Edit } from "lucide-react";
import { createFAQ, deleteFAQ } from "@/app/lib/actions";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

async function getFAQs() {
    await connectDB();
    const faqs = await FAQ.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(faqs));
}

export default async function AdminFAQs() {
    const faqs = await getFAQs();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">FAQ Manager</h2>
                    <p className="text-gray-500">Manage frequently asked questions on the homepage.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form to Add FAQ */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-8">
                        <h3 className="text-lg font-bold text-[#4E342E] mb-4 flex items-center gap-2">
                            <PlusCircle className="w-5 h-5 text-[#F7E3BA]" />
                            Add New FAQ
                        </h3>
                        <form action={createFAQ} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                                <textarea
                                    name="question"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4E342E] focus:outline-none text-sm"
                                    placeholder="e.g. How to store the powder?"
                                    rows={2}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                                <textarea
                                    name="answer"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4E342E] focus:outline-none text-sm"
                                    placeholder="Provide a detailed answer..."
                                    rows={4}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                <input
                                    type="number"
                                    name="order"
                                    defaultValue={0}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4E342E] focus:outline-none text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#4E342E] text-white py-3 rounded-lg font-bold hover:bg-[#3E2723] transition-all shadow-md active:scale-95"
                            >
                                Save FAQ
                            </button>
                        </form>
                    </div>
                </div>

                {/* FAQ List */}
                <div className="lg:col-span-2 space-y-4">
                    {faqs.map((faq: any) => (
                        <div key={faq._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#4E342E]/20 transition-all group">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <h4 className="font-bold text-[#4E342E] mb-2">{faq.question}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                                    <div className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest flex gap-4">
                                        <span>Order: {faq.order}</span>
                                        <span>ID: {faq._id}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Link
                                        href={`/admin/faqs/${faq._id}/edit`}
                                        className="p-2 text-gray-400 hover:text-[#4E342E] hover:bg-[#4E342E]/5 rounded-lg transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <DeleteButton
                                        itemName="this FAQ"
                                        onDelete={async () => {
                                            "use server"
                                            await deleteFAQ(faq._id);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {faqs.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400">No FAQs yet. Add your first one!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
