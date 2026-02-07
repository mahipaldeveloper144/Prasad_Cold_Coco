"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Client-side signin helper
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Use NextAuth client-side signIn. 
        // "credentials" refers to the provider ID we set in auth.ts
        // redirect: false allows us to handle the response manually without full page reload first
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid credentials. Please try again.");
        } else {
            router.push("/admin/dashboard");
            router.refresh(); // Refresh to update server components with new session
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF1DC]">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#4E342E]/10">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#4E342E] p-3 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-[#FFF1DC]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#4E342E]">Admin Access</h1>
                    <p className="text-[#4E342E]/60 text-sm">Prasad Cold Coco & Mango Pulp</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-[#4E342E] mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-[#4E342E]/20 focus:outline-none focus:ring-2 focus:ring-[#4E342E] bg-[#FFF1DC]/30 text-[#4E342E]"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#4E342E] mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-[#4E342E]/20 focus:outline-none focus:ring-2 focus:ring-[#4E342E] bg-[#FFF1DC]/30 text-[#4E342E]"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#4E342E] text-[#FFF1DC] font-bold py-3 rounded-lg hover:bg-[#3E2723] transition-colors shadow-lg"
                    >
                        Login to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
