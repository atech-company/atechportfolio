"use client";

import { motion } from "framer-motion";
import { type Service } from "@/lib/api";
import { Code, Smartphone, Globe, Database, Zap, Shield } from "lucide-react";

const iconMap: Record<string, any> = {
  code: Code,
  mobile: Smartphone,
  web: Globe,
  database: Database,
  performance: Zap,
  security: Shield,
};

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const Icon = iconMap[service.icon || "code"] || Code;

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-blue to-neon-green flex items-center justify-center">
              <Icon size={32} className="text-dark-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">{service.title}</span>
            </h1>
          </div>

          <div className="glass-strong p-8 rounded-xl">
            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {service.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

