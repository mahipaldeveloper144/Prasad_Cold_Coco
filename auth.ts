import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                // Hardcoded admin credentials for Phase 1
                const isValid =
                    credentials.username === "admin" &&
                    credentials.password === "prasad@123";

                if (isValid) {
                    return { id: "1", name: "Admin", email: "admin@prasad.com" };
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});
