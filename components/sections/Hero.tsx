"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { type Hero as HeroType } from "@/lib/types";
import { getStrapiImageUrl } from "@/lib/image-utils";

interface HeroProps {
  data?: HeroType | null;
}

const defaultHero: HeroType = {
  title: "Building Digital Excellence",
  subtitle:
    "We craft premium software solutions that transform businesses and delight users. Experience the future of digital innovation.",
  ctaText: "Start Your Project",
  ctaLink: "/contact",
};

export default function Hero({ data = defaultHero }: HeroProps) {
  const hero = data || defaultHero;
  const bgImageUrl = getStrapiImageUrl(hero.backgroundImage);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {bgImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt="Hero background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900/95 to-dark-900" />
        </div>
      )}

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-green/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-neon-blue/10 via-neon-green/10 to-neon-blue/10 rounded-full blur-3xl animate-spin-slow" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-neon-blue rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-neon-green rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-neon-blue rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-neon-green rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">{hero.title.split(" ").slice(0, -1).join(" ")}</span>
            <br />
            <span className="text-gradient neon-glow">
              {hero.title.split(" ").slice(-1)[0]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={hero.ctaLink}
              className="group relative px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg font-semibold text-dark-900 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-neon-glow magnetic-hover shimmer"
            >
              <span className="relative z-10 flex items-center gap-2">
                {hero.ctaText}
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1 group-hover:scale-110"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>

            <Link
              href="/portfolio"
              className="group px-8 py-4 glass glass-hover rounded-lg font-semibold text-white border border-white/20 hover:border-neon-blue/50 transition-all duration-300 hover:bg-white/10 relative overflow-hidden"
            >
              <span className="relative z-10">View Our Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-neon-blue/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-neon-blue rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

