import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/Navbar/Navbar";
import Footer from "./Footer";
import {SessionProvider} from "./SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mytailorzone",
  description: "Welcome to Mytailorzone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} p-4 max-w-full m-auto min-w-[300px] antialiased`}>
        <SessionProvider>
        <Navbar/>
        <main>
          {children}
        </main>
        <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}
