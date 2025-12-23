import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import CTA from "@/components/sections/CTA";
import { fetchHomePage, fetchServices, fetchProjects } from "@/lib/api";

export const revalidate = 60; // Revalidate every minute for faster updates

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com";

export const metadata: Metadata = {
  title: "Home - Premium Software Development Agency | ATECH",
  description:
    "ATECH is a premium software development agency specializing in modern web applications, mobile apps, and digital solutions. Transform your business with cutting-edge technology.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "digital solutions",
    "custom software",
    "Next.js development",
    "React development",
  ],
  openGraph: {
    title: "ATECH - Premium Software Development Agency",
    description:
      "Transform your business with cutting-edge software development solutions. Expert web development, mobile apps, and digital solutions.",
    url: siteUrl,
    type: "website",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function Home() {
  const [homePage, services, projects] = await Promise.all([
    fetchHomePage(),
    fetchServices(),
    fetchProjects({ featured: true, limit: 6 }),
  ]);

  return (
    <>
      <Hero data={homePage?.hero} />
      <Services services={services} />
      <FeaturedProjects projects={projects} />
      <CTA data={homePage?.cta} />
    </>
  );
}
