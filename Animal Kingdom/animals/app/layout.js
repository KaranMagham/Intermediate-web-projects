import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import React from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PawPedia - Explore the Animal Kingdom",
  description: "PawPedia is your gateway to discovering, searching, and learning about animals from around the world. Dive into detailed profiles, fun facts, and stunning images of your favorite creatures.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
