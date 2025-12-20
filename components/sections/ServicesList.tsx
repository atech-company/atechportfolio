"use client";

import { motion } from "framer-motion";
import { type Service } from "@/lib/api";
import ServiceCard from "@/components/ui/ServiceCard";
import { Code, Smartphone, Globe, Database, Zap, Shield } from "lucide-react";

const iconMap: Record<string, any> = {
  code: Code,
  mobile: Smartphone,
  web: Globe,
  database: Database,
  performance: Zap,
  security: Shield,
};

interface ServicesListProps {
  services: Service[];
}

export default function ServicesList({ services }: ServicesListProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon || "code"] || Code;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard service={service} icon={Icon} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

