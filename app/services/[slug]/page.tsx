import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchService, fetchServices } from "@/lib/api";
import ServiceDetail from "@/components/sections/ServiceDetail";

export async function generateStaticParams() {
  const services = await fetchServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await fetchService(params.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com";
  
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }
  
  return {
    title: `${service.title} - Software Development Service | ATECH`,
    description: service.description || `Professional ${service.title} services by ATECH. Expert software development solutions for your business.`,
    keywords: [
      service.title,
      "software development service",
      "web development",
      "tech services",
      "custom software",
    ],
    openGraph: {
      title: `${service.title} - Software Development Service | ATECH`,
      description: service.description || `Professional ${service.title} services by ATECH.`,
      url: `${siteUrl}/services/${params.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/services/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await fetchService(params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}

