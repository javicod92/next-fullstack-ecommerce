import { LoginButton } from "@/components/AuthButtons";
import NavBar from "@/components/NavBar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { auth } from "@/auth";
import "./globals.css";
import { useState } from "react";

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
        <div className="bg-bgGray min-h-screen ">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="flex">
            <NavBar />
            <main className="bg-white flex-grow p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
