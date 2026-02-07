import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        refId: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-[#4E342E]/10 flex flex-col h-full">
            <div className="relative h-64 w-full bg-[#FFF1DC]">
                {/* Placeholder for now or actual image */}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#4E342E] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Ref: {product.refId}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#4E342E] mb-2">{product.name}</h3>
                <p className="text-[#4E342E]/70 text-sm mb-4 flex-grow line-clamp-3">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-[#4E342E]">₹{product.price}</span>
                    <span className="text-xs text-[#25D366] bg-[#25D366]/10 px-2 py-1 rounded-md font-medium">
                        In Stock
                    </span>
                </div>

                <WhatsAppButton
                    product={{
                        name: product.name,
                        price: product.price,
                        refId: product.refId
                    }}
                />
            </div>
        </div>
    );
}
