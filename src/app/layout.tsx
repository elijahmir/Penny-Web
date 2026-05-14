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
  title: "Penny | The phone teammate built for self-storage",
  description:
    "Penny picks up every enquiry, rings every waitlist, books every tour, welcomes every new customer, and chases every overdue account - for self-storage facilities across Australia and New Zealand. Hear her in 2 minutes.",
  metadataBase: new URL("https://penny.brooklynbradley.com"),
  icons: {
    icon: "/penny-logo.svg",
    shortcut: "/penny-logo.svg",
    apple: "/penny-logo.svg",
  },
  keywords: [
    "self-storage answering service",
    "storage facility phone automation",
    "self storage waitlist automation",
    "after hours phone for storage",
    "storage units missed call",
    "virtual receptionist for self-storage",
    "Australian self-storage",
  ],
  openGraph: {
    title: "Penny | The phone teammate built for self-storage",
    description:
      "Every enquiry answered. Every unit filled. Penny is the phone teammate built for self-storage facilities.",
    url: "https://penny.brooklynbradley.com",
    siteName: "Penny",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Penny | The phone teammate built for self-storage",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Penny | The phone teammate built for self-storage",
    description:
      "Every enquiry answered. Every unit filled. Built for self-storage facilities.",
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
    "Virtual phone teammate built for self-storage facilities. Answers enquiries, rings waitlists, books tours, welcomes new customers, and chases overdue accounts - 24/7.",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Self-storage answering and waitlist service",
  operatingSystem: "Web",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Self-storage facility owners and operators",
  },
  areaServed: ["Australia", "New Zealand"],
  offers: {
    "@type": "Offer",
    description:
      "Pricing scales with call volume. For most facilities, the cost works out to less than one filled unit per month.",
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
