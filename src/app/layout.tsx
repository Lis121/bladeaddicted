import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BladeAddicted - Premium EDC Gear & Knife Reviews",
  description: "The ultimate resource for EDC knives, tactical folders, and outdoor blades. Discover the best gear for your carry.",
};

import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoCondensed.variable} antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
