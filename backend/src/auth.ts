import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import { NextResponse } from "next/server";

const adminEmails = process.env.ADMIN_EMAIL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google],
  callbacks: {
    async session({ session, token, user }) {
      // Si el usuario es un administrador, retornar la sesión completa
      if (adminEmails?.includes(session?.user?.email)) {
        return session; // Sesión válida
      }

      // Retornar una sesión con los datos básicos, eliminando "user"
      return { ...session, user: undefined };
    },
  },
});

export async function isAdmin() {
  const session = await auth();

  const userEmail = session?.user?.email;
  if (!userEmail || !adminEmails?.includes(userEmail)) {
    throw "Not an admin";
  }
}
