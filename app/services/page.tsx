import { Metadata } from "next";
import { fetchServices } from "@/lib/api";
import ServicesHero from "@/components/sections/ServicesHero";
import ServicesList from "@/components/sections/ServicesList";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Services - Web Development, Mobile Apps & Digital Solutions | ATECH",
  description:
    "Comprehensive software development services including web development, mobile apps, APIs, cloud solutions, e-commerce, and custom software. Expert developers ready to transform your business.",
  keywords: [
    "web development services",
    "mobile app development",
    "software development services",
    "custom software",
    "API development",
    "cloud solutions",
    "e-commerce development",
    "full-stack development",
  ],
  openGraph: {
    title: "Services - Web Development, Mobile Apps & Digital Solutions | ATECH",
    description:
      "Comprehensive software development services including web development, mobile apps, APIs, cloud solutions, e-commerce, and custom software.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/services`,
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/services`,
  },
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await fetchServices();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com";

  // Service Collection Structured Data
  const serviceCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development Services",
    provider: {
      "@type": "Organization",
      name: "ATECH",
      url: siteUrl,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${siteUrl}/services/${service.slug}`,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <>
      <StructuredData data={serviceCollectionSchema} />
      <ServicesHero />
      <ServicesList services={services} />
    </>
  );
}
