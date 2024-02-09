import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/db";
export const config = {
  adapter:  PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL || undefined,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL || undefined,
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const isAuthenticated = !!auth;
      return isAuthenticated;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
