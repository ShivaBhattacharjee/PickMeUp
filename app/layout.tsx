import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import AnimatedBackground from "@/components/AnimatedBackground";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PickMeUp - Pickup Line Generator",
  description: "Invest more time in your crush and less time in thinking about pickup lines. Let the AI do the work for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black text-white overflow-x-hidden antialiased`}
      >
        <Toaster />
        <AnimatedBackground />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
