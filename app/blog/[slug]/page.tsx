import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/api";
import BlogPostDetail from "@/components/sections/BlogPostDetail";

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage.data?.attributes.url || "",
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}

