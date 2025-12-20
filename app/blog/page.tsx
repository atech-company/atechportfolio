import { Metadata } from "next";
import { fetchBlogPosts } from "@/lib/api";
import BlogHero from "@/components/sections/BlogHero";
import BlogGrid from "@/components/sections/BlogGrid";

export const metadata: Metadata = {
  title: "Blog - Software Development & Technology Insights | ATECH",
  description:
    "Read our latest articles about software development, technology trends, and industry insights. Stay updated with web development, mobile apps, and tech best practices.",
  keywords: [
    "tech blog",
    "software development blog",
    "web development articles",
    "technology insights",
    "programming blog",
    "tech trends",
  ],
  openGraph: {
    title: "Blog - Software Development & Technology Insights | ATECH",
    description:
      "Read our latest articles about software development, technology trends, and industry insights.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/blog`,
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atech.com"}/blog`,
  },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await fetchBlogPosts({ limit: 12 });

  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} />
    </>
  );
}

