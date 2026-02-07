"use client";

import { useState } from "react";
import { Trash2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteButtonProps {
    onDelete: () => Promise<void>;
    itemName?: string;
}

export default function DeleteButton({ onDelete, itemName }: DeleteButtonProps) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete();
        } catch (error) {
            console.error("Failed to delete:", error);
            setIsDeleting(false);
            setIsConfirming(false);
        }
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsConfirming(true)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete item"
            >
                <Trash2 className="w-4 h-4" />
            </button>

            <AnimatePresence>
                {isConfirming && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-100"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-red-50 rounded-full mb-4">
                                    <AlertCircle className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Are you sure?</h3>
                                <p className="text-gray-500 mb-8">
                                    Do you really want to delete {itemName ? <span className="font-bold text-gray-700">"{itemName}"</span> : "this item"}? This action cannot be undone.
                                </p>
                                <div className="flex gap-4 w-full">
                                    <button
                                        onClick={() => setIsConfirming(false)}
                                        disabled={isDeleting}
                                        className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex-1 px-6 py-3 rounded-xl bg-red-600 font-bold text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isDeleting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Deleting...
                                            </>
                                        ) : "Confirm Delete"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
