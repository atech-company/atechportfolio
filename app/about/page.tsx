import { Metadata } from "next";
import { fetchTeamMembers, fetchTestimonials, fetchAboutPage } from "@/lib/api";
import AboutHero from "@/components/sections/AboutHero";
import TeamSection from "@/components/sections/TeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import StatsSection from "@/components/sections/StatsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "About Us - Our Story, Mission & Team | ATECH",
  description:
    "Learn about ATECH - a premium software development agency dedicated to crafting exceptional digital experiences. Discover our mission, vision, values, and the talented team behind our success.",
  keywords: [
    "about ATECH",
    "software development company",
    "tech agency about",
    "development team",
    "company mission",
    "technology experts",
  ],
  openGraph: {
    title: "About Us - Our Story, Mission & Team | ATECH",
    description:
      "Learn about ATECH - a premium software development agency dedicated to crafting exceptional digital experiences. Discover our mission, vision, values, and the talented team behind our success.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/about`,
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/about`,
  },
};

export const revalidate = 3600;

export default async function AboutPage() {
  const [teamMembers, testimonials, aboutPage] = await Promise.all([
    fetchTeamMembers(),
    fetchTestimonials(6),
    fetchAboutPage(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com";

  // AboutPage Structured Data
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "ATECH",
      description: aboutPage?.hero?.subtitle || "Premium software development agency",
      url: siteUrl,
    },
  };

  return (
    <>
      <StructuredData data={aboutPageSchema} />
      <AboutHero />
      <StatsSection />
      <TimelineSection />
      <TeamSection members={teamMembers} />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
