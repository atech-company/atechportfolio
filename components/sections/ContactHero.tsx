"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Get in </span>
            <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Let's discuss your project and how we can help bring your vision to
            life
          </p>
        </motion.div>
      </div>
    </section>
  );
}

