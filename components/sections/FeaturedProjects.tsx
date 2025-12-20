"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { type Project, getStrapiImageUrl } from "@/lib/api";
import { truncateText } from "@/lib/utils";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-32 relative bg-dark-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing our best work and innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            // Get thumbnail URL - should be a string after API transformation
            let thumbnailUrl: string | null = null;
            
            // Thumbnail should be a string at this point (after API extraction)
            if (project.thumbnail && typeof project.thumbnail === 'string') {
              thumbnailUrl = project.thumbnail;
            } 
            // Fallback: if thumbnail is still an object, try to extract
            else if (project.thumbnail && typeof project.thumbnail === 'object') {
              const thumb = project.thumbnail as any; // Type assertion for flexible format
              if (thumb.data?.attributes?.url) {
                thumbnailUrl = thumb.data.attributes.url;
              } else if (typeof thumb.data === 'string') {
                thumbnailUrl = thumb.data;
              } else if (thumb.url) {
                thumbnailUrl = thumb.url;
              }
            }
            
            // Fallback to first image if no thumbnail
            if (!thumbnailUrl && project.images) {
              if (Array.isArray(project.images) && project.images.length > 0) {
                const firstImg = project.images[0];
                thumbnailUrl = typeof firstImg === 'string' ? firstImg : null;
              }
            }
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/portfolio/${project.slug}`} className="block">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="glass-strong glass-hover rounded-xl overflow-hidden cursor-pointer group hover:border-neon-blue/50 transition-all duration-300 relative magnetic-hover"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none" />
                    
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue/20 to-neon-green/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    {/* Project Image */}
                    {thumbnailUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={thumbnailUrl}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/40 to-transparent" />
                        {/* Overlay glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-green/0 group-hover:from-neon-blue/10 group-hover:to-neon-green/10 transition-all duration-500" />
                      </div>
                    )}

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-neon-blue transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {truncateText(project.description, 120)}
                      </p>

                      {/* Tech Stack */}
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs rounded glass text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/30 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex items-center gap-4">
                        {project.projectUrl && (
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
                            }}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-blue transition-colors cursor-pointer"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </span>
                        )}
                        {project.githubUrl && (
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                            }}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-blue transition-colors cursor-pointer"
                          >
                            <Github size={16} />
                            Code
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 px-6 py-3 glass glass-hover rounded-lg font-semibold text-white border border-white/20 hover:border-neon-blue/50 transition-all duration-300 hover:bg-white/10 relative overflow-hidden"
          >
            <span className="relative z-10">View All Projects</span>
            <ExternalLink size={18} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

