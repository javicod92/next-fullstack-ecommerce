import { LoginButton } from "@/components/AuthButtons";
import NavBar from "@/components/NavBar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { auth } from "@/auth";
import "./globals.css";

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
  if (!session?.user) {
    return (
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <div className="bg-bgGray w-screen h-screen flex items-center justify-center">
            <LoginButton />
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="bg-bgGray min-h-screen flex flex-col">
          <NavBar />
          <main className="bg-white flex-grow p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
