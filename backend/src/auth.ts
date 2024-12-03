import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { mongooseConnect } from "./lib/mongoose";
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        await mongooseConnect();

        // Check if user exists in database
        let existingUser = await User.findOne({ email: user.email });

        // Create user if it doesn't exist
        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user", // Default role for new users
          });
        }

        // Attach role to the user object
        user.role = existingUser.role;
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // Include role in the token if available
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      // Include role in the session object
      session.user.role =
        token?.role && typeof token.role === "string" ? token.role : "user";
      return session;
    },
  },
  session: {
    // Session duration
    maxAge: 24 * 60 * 60, // 24 hours
    strategy: "jwt",
  },
  jwt: {
    // JWT expiration
    maxAge: 24 * 60 * 60, // 24 hours
  },
});

export async function isAdmin() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      throw new Error("Unauthorized access");
    }
  } catch (error) {
    console.error("Error in isAdmin:", error);
    throw new Error("Unauthorized access");
  }
}
