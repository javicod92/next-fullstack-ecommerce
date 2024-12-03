import { LoginButton } from "@/components/AuthButtons";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { auth } from "@/auth";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { SideBar, TopBar } from "@/components/NavBar/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "next-ecommerce",
  description: "e-commerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {session?.user.role === "admin" ? (
          <NavBar>
            <TopBar />
            <div className="bg-bgGray min-h-screen flex">
              <SideBar />
              <main className="flex-grow p-4">{children}</main>
            </div>
          </NavBar>
        ) : (
          <div className="bg-bgGray w-screen h-screen flex items-center justify-center">
            <LoginButton />
          </div>
        )}
      </body>
    </html>
  );
}
