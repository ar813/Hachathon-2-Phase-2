import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://hachathon-2-phase-2.vercel.app",
});

export const {
    signIn,
    signUp,
    signOut,
    useSession
} = authClient;
