import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import prisma from "@/app/lib/db/prisma";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { env } from "@/app/lib/db/env";
import { mergeanoymousCartIntoUserCart } from "@/app/lib/db/cart";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID!,
            clientSecret: env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    events: {
        signIn: async ({ user }) => {
            await mergeanoymousCartIntoUserCart(user.id);
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
