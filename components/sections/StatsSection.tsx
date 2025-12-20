"use client";

import { motion } from "framer-motion";
import { Code, Users, Award, Rocket } from "lucide-react";

const stats = [
  { icon: Code, value: "500+", label: "Projects Delivered" },
  { icon: Users, value: "200+", label: "Happy Clients" },
  { icon: Award, value: "50+", label: "Awards Won" },
  { icon: Rocket, value: "10+", label: "Years Experience" },
];

export default function StatsSection() {
  return (
    <section className="py-20 relative bg-dark-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-green mb-4 relative group-hover:shadow-neon-glow transition-shadow duration-300"
                >
                  <Icon size={32} className="text-dark-900 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-green rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
                  className="text-4xl md:text-5xl font-bold text-gradient mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

