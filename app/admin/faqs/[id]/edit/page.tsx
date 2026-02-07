import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import { updateFAQ } from "@/app/lib/actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditFAQPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    await connectDB();
    const faq = await FAQ.findById(id).lean();

    if (!faq) {
        notFound();
    }

    const updateFAQWithId = updateFAQ.bind(null, id);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/faqs"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit FAQ</h1>
            </div>

            <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
                <form action={updateFAQWithId} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                        <textarea
                            name="question"
                            defaultValue={faq.question}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                        <textarea
                            name="answer"
                            defaultValue={faq.answer}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                            rows={6}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                        <input
                            type="number"
                            name="order"
                            defaultValue={faq.order}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E342E] focus:border-transparent outline-none"
                        />
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#4E342E] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#3E2723] transition-colors flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Update FAQ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
