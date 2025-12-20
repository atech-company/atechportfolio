"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { type BlogPost, getStrapiImageUrl } from "@/lib/api";
import { formatDate, truncateText } from "@/lib/utils";

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-lg">No blog posts found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, index) => {
            const imageUrl = getStrapiImageUrl(post.featuredImage);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="glass-strong rounded-xl overflow-hidden cursor-pointer group hover:border-neon-blue/50 transition-all duration-300 h-full flex flex-col"
                  >
                    {imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                      {post.category && (
                        <span className="inline-block px-3 py-1 text-xs rounded-full glass text-neon-blue mb-3 w-fit">
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-neon-blue transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 flex-1">
                        {truncateText(post.excerpt || post.content, 120)}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(post.publishedAt)}
                        </div>
                        {post.author && (
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            {post.author.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

