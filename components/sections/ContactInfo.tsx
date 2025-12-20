"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@atech.com",
    href: "mailto:contact@atech.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (234) 567-890",
    href: "tel:+1234567890",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Tech Street, San Francisco, CA 94105",
    href: null,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM PST",
    href: null,
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
        <p className="text-gray-400 mb-8">
          Have a question or want to work together? We'd love to hear from you.
          Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="space-y-4">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          const content = info.href ? (
            <a
              href={info.href}
              className="text-neon-blue hover:text-neon-green transition-colors"
            >
              {info.value}
            </a>
          ) : (
            <span className="text-gray-300">{info.value}</span>
          );

          return (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-strong p-4 rounded-lg flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-green flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-dark-900" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-400 mb-1">
                  {info.label}
                </div>
                <div className="text-white">{content}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

