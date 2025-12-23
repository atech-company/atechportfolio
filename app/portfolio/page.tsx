import { Metadata } from "next";
import { fetchProjects } from "@/lib/api";
import PortfolioHero from "@/components/sections/PortfolioHero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export const metadata: Metadata = {
  title: "Portfolio - Our Projects & Case Studies | ATECH",
  description:
    "Explore our portfolio of innovative projects and digital solutions crafted for clients worldwide. See our web development, mobile apps, and custom software projects.",
  keywords: [
    "portfolio projects",
    "web development portfolio",
    "mobile app portfolio",
    "software projects",
    "case studies",
    "client work",
    "tech portfolio",
  ],
  openGraph: {
    title: "Portfolio - Our Projects & Case Studies | ATECH",
    description:
      "Explore our portfolio of innovative projects and digital solutions crafted for clients worldwide.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/portfolio`,
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/portfolio`,
  },
};

export const revalidate = 0; // Always fetch fresh data - no caching
export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  return (
    <>
      <PortfolioHero />
      <ProjectsGrid projects={projects} />
    </>
  );
}

