import type { Metadata } from "next";
import Script from "next/script";
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
  title: "BladeAddicted • Premium Knives & EDC",
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
      <body className={`${inter.variable} ${robotoCondensed.variable} antialiased`} suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-MJSK0X08X1`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MJSK0X08X1');
            `,
          }}
        />
      </body>
    </html>
  );
}
