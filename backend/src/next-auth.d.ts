// next-auth.d.ts
import { DefaultSession } from "next-auth";

// Extiende el tipo `User` para incluir la propiedad `role`
declare module "next-auth" {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    role: string;
  }
}
