import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticleField from "@/components/ParticleField";
import Navigation from "@/components/Navigation";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Metaversal Space — The Agentic Metaverse",
  description: "A living, agent-powered space where ideas connect themselves. The metaverse isn't VR — it's AI agents operating autonomously across digital spaces.",
  keywords: ["agentic AI", "metaverse", "AI agents", "prediction markets", "thought stream"],
  openGraph: {
    title: "Metaversal Space",
    description: "The aliens were never out there. We built them right here.",
    type: "website",
    url: "https://metaversal.space",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased gradient-mesh`} style={{ background: '#030308' }}>
        <ParticleField />
        <Navigation />
        <main className="relative pt-20" style={{ zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
