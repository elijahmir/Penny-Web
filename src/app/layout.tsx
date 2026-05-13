import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Penny | Your virtual phone assistant, on duty 24/7",
  description:
    "Penny answers calls, makes callbacks, books appointments, and sends follow-ups for your business. Hear her in action in 30 seconds.",
  metadataBase: new URL("https://penny.brooklynbradley.com"),
  icons: {
    icon: "/penny-logo.svg",
    shortcut: "/penny-logo.svg",
    apple: "/penny-logo.svg",
  },
  openGraph: {
    title: "Penny | Your virtual phone assistant, on duty 24/7",
    description:
      "Penny answers calls, makes callbacks, books appointments, and sends follow-ups for your business. Hear her in action in 30 seconds.",
    url: "https://penny.brooklynbradley.com",
    siteName: "Penny",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Penny | Virtual phone assistant",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Penny | Your virtual phone assistant, on duty 24/7",
    description:
      "Penny answers calls, makes callbacks, books appointments, and sends follow-ups for your business.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Penny",
  description:
    "Virtual phone assistant that answers calls, makes callbacks, books appointments, and sends follow-ups for businesses.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    description: "Pricing scales with usage. Get in touch for a quote.",
  },
  provider: {
    "@type": "Organization",
    name: "Brooklyn Bradley",
    url: "https://penny.brooklynbradley.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
