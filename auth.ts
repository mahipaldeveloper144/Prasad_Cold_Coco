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
                const { username, password } = credentials;

                // Compare with environment variables
                const isValid =
                    username === process.env.ADMIN_USERNAME &&
                    password === process.env.ADMIN_PASSWORD;

                if (isValid) {
                    return { id: "1", name: "Admin", email: "admin@prasadcoldcoco.in" };
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});
