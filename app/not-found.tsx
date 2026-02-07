import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#FFF1DC]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-6xl font-bold text-[#4E342E] mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-[#4E342E] mb-8">Oops! Page not found.</h2>
                <p className="text-[#4E342E]/70 mb-12 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-[#4E342E] text-[#FFF1DC] font-bold text-lg px-8 py-4 rounded-full hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
