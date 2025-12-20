import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ATECH - Premium Software Development Agency | Web Development & Digital Solutions",
    template: "%s | ATECH",
  },
  description:
    "ATECH is a premium software development agency specializing in modern web applications, mobile apps, and digital solutions. Expert developers delivering cutting-edge technology solutions.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "digital agency",
    "tech solutions",
    "custom software",
    "Next.js development",
    "React development",
    "full-stack development",
    "API development",
    "cloud solutions",
    "e-commerce development",
  ],
  authors: [{ name: "ATECH", url: siteUrl }],
  creator: "ATECH",
  publisher: "ATECH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ATECH",
    title: "ATECH - Premium Software Development Agency | Web Development & Digital Solutions",
    description:
      "Expert software development agency delivering modern web applications, mobile apps, and cutting-edge digital solutions. Transform your business with our technology expertise.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ATECH - Premium Software Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATECH - Premium Software Development Agency",
    description:
      "Expert software development agency delivering modern web applications, mobile apps, and cutting-edge digital solutions.",
    images: ["/og-image.jpg"],
    creator: "@atech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Structured Data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ATECH",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: "Premium software development agency specializing in modern web applications, mobile apps, and digital solutions.",
    sameAs: [
      // Add your social media URLs here
      // "https://www.facebook.com/atech",
      // "https://www.twitter.com/atech",
      // "https://www.linkedin.com/company/atech",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@atech.com",
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };

  // WebSite Structured Data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ATECH",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className}>
        <SplashScreen />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

