import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A community driven platform for asking questions and sharing knowledge",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
