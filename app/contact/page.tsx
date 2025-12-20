import { Metadata } from "next";
import ContactHero from "@/components/sections/ContactHero";
import ContactForm from "@/components/sections/ContactForm";
import ContactInfo from "@/components/sections/ContactInfo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch | ATECH Software Development Agency",
  description:
    "Get in touch with ATECH. Let's discuss your project and how we can help bring your vision to life. Contact our expert team for web development, mobile apps, and digital solutions.",
  keywords: [
    "contact ATECH",
    "software development contact",
    "get quote",
    "web development contact",
    "tech agency contact",
    "project inquiry",
  ],
  openGraph: {
    title: "Contact Us - Get in Touch | ATECH Software Development Agency",
    description:
      "Get in touch with ATECH. Let's discuss your project and how we can help bring your vision to life.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/contact`,
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/contact`,
  },
};

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com";

  // ContactPage Structured Data
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: "ATECH",
      url: siteUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: "contact@atech.com",
        availableLanguage: ["English"],
      },
    },
  };

  return (
    <>
      <StructuredData data={contactPageSchema} />
      <ContactHero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </>
  );
}
