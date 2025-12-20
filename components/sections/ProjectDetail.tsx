"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { type Project, getStrapiImageUrl } from "@/lib/api";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  // Handle both string URLs and Strapi format
  // Prioritize thumbnail first, then fall back to images
  let imageUrl: string | null = null;
  
  // First, try to get thumbnail
  if (project.thumbnail) {
    if (typeof project.thumbnail === 'string') {
      imageUrl = project.thumbnail;
    } else if (typeof project.thumbnail === 'object') {
      const thumb = project.thumbnail as any; // Type assertion for flexible format
      // Handle Strapi format
      if (thumb.data) {
        if (thumb.data.attributes && thumb.data.attributes.url) {
          imageUrl = thumb.data.attributes.url;
        } else if (typeof thumb.data === 'string') {
          imageUrl = thumb.data;
        } else if (thumb.data.url) {
          imageUrl = thumb.data.url;
        }
      } else if (thumb.url) {
        imageUrl = thumb.url;
      } else {
        imageUrl = getStrapiImageUrl(project.thumbnail);
      }
    }
  }
  
  // Fallback to images array if no thumbnail
  if (!imageUrl && project.images) {
    if (Array.isArray(project.images) && project.images.length > 0) {
      const firstImage = project.images[0];
      if (typeof firstImage === 'string') {
        imageUrl = firstImage;
      } else if (typeof firstImage === 'object') {
        const img = firstImage as any; // Type assertion for flexible format
        if (img.data) {
          if (img.data.attributes && img.data.attributes.url) {
            imageUrl = img.data.attributes.url;
          } else if (typeof img.data === 'string') {
            imageUrl = img.data;
          }
        } else if (img.url) {
          imageUrl = img.url;
        } else {
          imageUrl = getStrapiImageUrl(firstImage);
        }
      }
    } else if (typeof project.images === 'string') {
      imageUrl = project.images;
    } else if (typeof project.images === 'object' && !Array.isArray(project.images)) {
      imageUrl = getStrapiImageUrl(project.images);
    }
  }

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{project.title}</span>
          </h1>

          {imageUrl ? (
            <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden glass-strong">
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          ) : (
            <div className="w-full h-96 mb-8 rounded-xl overflow-hidden glass-strong flex items-center justify-center">
              <p className="text-gray-400">No image available</p>
            </div>
          )}

          <div className="glass-strong p-8 rounded-xl mb-8">
            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-lg glass text-neon-blue font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg font-semibold text-dark-900 hover:scale-105 transition-transform"
              >
                <ExternalLink size={20} />
                View Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg font-semibold text-white border border-white/20 hover:border-neon-blue/50 transition-all"
              >
                <Github size={20} />
                View Code
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

