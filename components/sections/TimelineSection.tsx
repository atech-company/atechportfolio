"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Calendar, MapPin, Award, Rocket, Code, Users } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  location?: string;
  icon?: string;
}

interface TimelineSectionProps {
  timeline?: TimelineItem[];
}

const iconMap: Record<string, any> = {
  calendar: Calendar,
  award: Award,
  rocket: Rocket,
  code: Code,
  users: Users,
  mapPin: MapPin,
};

export default function TimelineSection({ timeline: initialTimeline }: TimelineSectionProps) {
  const [timeline, setTimeline] = useState<TimelineItem[]>(
    initialTimeline || []
  );
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch timeline data
    fetch('/api/content/about-page')
      .then(res => res.json())
      .then(data => {
        if (data.data?.timeline && Array.isArray(data.data.timeline)) {
          setTimeline(data.data.timeline);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => {
      items?.forEach((item) => observer.unobserve(item));
    };
  }, [timeline]);

  if (!timeline || timeline.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-32 relative bg-dark-800/30">
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
            <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A timeline of our growth, achievements, and milestones
          </p>
        </motion.div>

        <div ref={sectionRef} className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-green to-neon-blue transform md:-translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-neon-blue to-neon-green"
              initial={{ height: 0 }}
              animate={{
                height: visibleItems.size > 0 ? '100%' : 0,
              }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
            />
          </div>

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = iconMap[item.icon || 'calendar'] || Calendar;
              const isVisible = visibleItems.has(index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  data-index={index}
                  className={`relative flex items-start gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        isVisible
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className="relative"
                    >
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 rounded-full bg-neon-blue/30 blur-xl animate-pulse" />
                      
                      {/* Main circle */}
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-green flex items-center justify-center border-4 border-dark-900 shadow-lg">
                        <Icon size={24} className="text-dark-900" />
                      </div>

                      {/* Pulsing ring animation */}
                      {isVisible && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-neon-blue"
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={
                      isVisible
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: isEven ? -50 : 50 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 0.3,
                    }}
                    className={`flex-1 ${
                      isEven ? 'md:text-left md:pr-8' : 'md:text-right md:pl-8'
                    }`}
                  >
                    <div className="glass-strong p-6 rounded-xl hover:border-neon-blue/50 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-gradient">
                          {item.year}
                        </span>
                        {item.location && (
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <MapPin size={16} />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

