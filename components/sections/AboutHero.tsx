"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AboutHeroProps {
  hero?: {
    title: string;
    subtitle: string;
  };
}

export default function AboutHero({ hero: initialHero }: AboutHeroProps) {
  const [hero, setHero] = useState(initialHero || {
    title: "About ATECH",
    subtitle: "We are a team of passionate developers, designers, and innovators dedicated to crafting exceptional digital experiences that transform businesses and delight users.",
  });

  useEffect(() => {
    // Fetch about page data on client side
    fetch('/api/content/about-page')
      .then(res => res.json())
      .then(data => {
        if (data.data?.hero) {
          setHero(data.data.hero);
        }
      })
      .catch(console.error);
  }, []);

  // Split title to handle "About ATECH" format
  const titleParts = hero.title.split(' ');
  const lastPart = titleParts.pop() || '';
  const firstParts = titleParts.join(' ');

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
            {firstParts && <span className="text-white">{firstParts} </span>}
            <span className="text-gradient">{lastPart}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            {hero.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

