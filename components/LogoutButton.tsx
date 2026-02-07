"use client";

import { useState } from "react";
import { LogOut, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogoutButtonProps {
    onLogout: () => Promise<void>;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleLogout = async () => {
        setIsProcessing(true);
        try {
            await onLogout();
        } catch (error) {
            console.error("Logout failed:", error);
            setIsProcessing(false);
            setIsConfirming(false);
        }
    };

    return (
        <div className="relative inline-block w-full">
            <button
                onClick={() => setIsConfirming(true)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-300 hover:text-red-100 w-full hover:bg-red-900/20 rounded-lg transition-colors"
            >
                <LogOut className="w-5 h-5" />
                Sign Out
            </button>

            <AnimatePresence>
                {isConfirming && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-100"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-orange-50 rounded-full mb-4">
                                    <AlertCircle className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 italic">Logging Out?</h3>
                                <p className="text-gray-500 mb-8">
                                    Are you sure you want to end your session? You will need to log in again to access the admin panel.
                                </p>
                                <div className="flex flex-col gap-3 w-full">
                                    <button
                                        onClick={handleLogout}
                                        disabled={isProcessing}
                                        className="w-full px-6 py-3 rounded-xl bg-[#4E342E] font-bold text-[#FFF1DC] hover:bg-[#3E2723] transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-[#FFF1DC]/30 border-t-[#FFF1DC] rounded-full animate-spin"></div>
                                                Signing out...
                                            </>
                                        ) : "Yes, Sign Out"}
                                    </button>
                                    <button
                                        onClick={() => setIsConfirming(false)}
                                        disabled={isProcessing}
                                        className="w-full px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        Stay Logged In
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
