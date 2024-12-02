import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { mongooseConnect } from "./lib/mongoose";
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      await mongooseConnect();

      // First, search if the user exists or not in database
      let existingUser = await User.findOne({ email: user.email });

      // If the user doesn't exist in database, create one.
      if (!existingUser) {
        existingUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }
      user.role = existingUser.role;
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role =
        token?.role && typeof token.role === "string" ? token.role : "user";
      return session;
    },
  },
  session: {
    // Set the session duration in 1 hour
    maxAge: 24 * 60 * 60, // In seconds (86400 sec = 1 day)
  },
  jwt: {
    // Set the token expirations in 1 hour
    maxAge: 24 * 60 * 60, // In seconds (86400 sec = 1 day)
  },
});

// Function used to protect pages and api routes
export async function isAdmin() {
  const session = await auth();
  if (session?.user.role !== "admin") {
    throw "Unauthorized";
  }
}
