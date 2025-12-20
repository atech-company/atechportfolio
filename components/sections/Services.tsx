"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Globe, Database, Zap, Shield } from "lucide-react";
import { type Service } from "@/lib/api";
import ServiceCard from "@/components/ui/ServiceCard";

interface ServicesProps {
  services: Service[];
}

const iconMap: Record<string, any> = {
  code: Code,
  mobile: Smartphone,
  web: Globe,
  database: Database,
  performance: Zap,
  security: Shield,
};

const defaultServices: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Modern, responsive web applications built with cutting-edge technologies for optimal performance and user experience.",
    icon: "web",
    slug: "web-development",
  },
  {
    id: 2,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.",
    icon: "mobile",
    slug: "mobile-apps",
  },
  {
    id: 3,
    title: "API Development",
    description:
      "Robust, scalable REST and GraphQL APIs designed for performance, security, and maintainability.",
    icon: "code",
    slug: "api-development",
  },
  {
    id: 4,
    title: "Cloud Solutions",
    description:
      "Cloud infrastructure and deployment strategies to scale your applications efficiently and securely.",
    icon: "database",
    slug: "cloud-solutions",
  },
  {
    id: 5,
    title: "Performance Optimization",
    description:
      "Speed up your applications with advanced optimization techniques and best practices.",
    icon: "performance",
    slug: "performance-optimization",
  },
  {
    id: 6,
    title: "Security & Compliance",
    description:
      "Enterprise-grade security measures and compliance solutions to protect your data and users.",
    icon: "security",
    slug: "security-compliance",
  },
];

export default function Services({ services = defaultServices }: ServicesProps) {
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section className="py-20 lg:py-32 relative particle-bg">
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
            <span className="text-gradient neon-glow">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((service, index) => {
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

