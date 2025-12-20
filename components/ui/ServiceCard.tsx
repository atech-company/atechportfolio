"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { type Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
  icon: LucideIcon;
}

export default function ServiceCard({ service, icon: Icon }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className="block">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="glass-strong glass-hover p-6 rounded-xl h-full cursor-pointer group hover:border-neon-blue/50 transition-all duration-300 relative overflow-hidden magnetic-hover"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0" />
        
        {/* Glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue/20 to-neon-green/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        
        <div className="relative z-10">
          <div className="mb-4">
            <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-neon-green flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-neon-glow">
              <Icon size={24} className="text-dark-900 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-green rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-neon-blue transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

