import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";

const adminEmails = process.env.ADMIN_EMAIL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (adminEmails?.includes(user.email!)) {
        return true;
      }
      return false;
    },
    async session({ session }) {
      // Si el usuario es un administrador, retornar la sesión completa
      if (adminEmails?.includes(session?.user?.email)) {
        return session; // Sesión válida
      }

      // Retornar una sesión con los datos básicos, eliminando "user"
      return { ...session, user: undefined };
    },
  },
});

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: MongoDBAdapter(client),
//   providers: [Google],
//   callbacks: {
//     async signIn({ user }) {
//
//       if (adminEmails?.includes(user.email!)) {
//         return true;
//       }
//       return false;
//     },
//     async session({ session }) {
//
//       if (session.user && adminEmails?.includes(session.user.email!)) {
//         session.user.isAdmin = true;
//       } else {
//         session.user.isAdmin = false;
//       }
//       return session;
//     },
//   },
// });

export async function isAdmin() {
  const session = await auth();

  const userEmail = session?.user?.email;
  if (!userEmail || !adminEmails?.includes(userEmail)) {
    throw "Not an admin";
  }
}
