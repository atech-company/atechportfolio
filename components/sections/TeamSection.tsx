"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Github } from "lucide-react";
import { type TeamMember, getStrapiImageUrl } from "@/lib/api";

interface TeamSectionProps {
  members: TeamMember[];
}

export default function TeamSection({ members }: TeamSectionProps) {
  if (!members || members.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="text-gradient">Team</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the talented individuals behind ATECH
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => {
            const avatarUrl = getStrapiImageUrl(member.avatar);
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-strong p-6 rounded-xl text-center group hover:border-neon-blue/50 transition-all duration-300"
              >
                {avatarUrl && (
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-neon-blue/50">
                    <Image
                      src={avatarUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-1 text-white">
                  {member.name}
                </h3>
                <p className="text-neon-blue mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                {member.socialLinks && (
                  <div className="flex justify-center gap-3">
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                      >
                        <Linkedin size={18} className="text-gray-400 hover:text-neon-blue" />
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                      >
                        <Twitter size={18} className="text-gray-400 hover:text-neon-blue" />
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                      >
                        <Github size={18} className="text-gray-400 hover:text-neon-blue" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

