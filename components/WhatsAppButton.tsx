"use client";

import { useState } from "react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
    product: {
        name: string;
        price: number;
        refId: string;
    };
}

export default function WhatsAppButton({ product }: WhatsAppButtonProps) {
    const [quantity, setQuantity] = useState(1);
    // Default phone number for now, can be moved to env later
    const PHONE_NUMBER = "919876543210";

    const handleOrder = () => {
        const link = generateWhatsAppLink(PHONE_NUMBER, product, quantity);
        window.open(link, "_blank");
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-[#4E342E]">Quantity:</label>
                <div className="flex items-center border border-[#4E342E]/20 rounded-md overflow-hidden">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 hover:bg-[#4E342E]/10 text-[#4E342E]"
                    >
                        -
                    </button>
                    <span className="px-3 py-1 text-[#4E342E] font-bold w-8 text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 hover:bg-[#4E342E]/10 text-[#4E342E]"
                    >
                        +
                    </button>
                </div>
            </div>

            <button
                onClick={handleOrder}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
            </button>
            <p className="text-xs text-center text-[#4E342E]/60">
                Directly chats with store owner
            </p>
        </div>
    );
}
