"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { type BlogPost } from "@/lib/types";
import { getStrapiImageUrl } from "@/lib/image-utils";
import { formatDate } from "@/lib/utils";

interface BlogPostDetailProps {
  post: BlogPost;
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  const imageUrl = getStrapiImageUrl(post.featuredImage);

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {post.category && (
            <span className="inline-block px-4 py-2 text-sm rounded-full glass text-neon-blue mb-4">
              {post.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{post.title}</span>
          </h1>

          <div className="flex items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {formatDate(post.publishedAt)}
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <User size={18} />
                {post.author.name}
              </div>
            )}
          </div>

          {imageUrl && (
            <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="glass-strong p-8 rounded-xl">
            <div
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-lg glass text-neon-blue"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </section>
  );
}

