"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const router = useRouter();

  const lines = [
    "Welcome in ALL TECHNOLOGY",
    "ATECH",
    "the dev of technology",
  ];

  useEffect(() => {
    // Check if splash was already shown (only show once per session)
    if (typeof window === "undefined") return;
    
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown === "true") {
      setShowSplash(false);
      return;
    }

    let charIndex = 0;
    let lineIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeText = () => {
      if (lineIndex < lines.length) {
        const currentLineText = lines[lineIndex];
        
        if (charIndex < currentLineText.length) {
          setDisplayText(currentLineText.substring(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeText, 80); // Faster typing speed
        } else {
          // Line complete, wait a bit then move to next line
          setTimeout(() => {
            lineIndex++;
            charIndex = 0;
            if (lineIndex < lines.length) {
              setCurrentLine(lineIndex);
              setDisplayText("");
              timeoutId = setTimeout(typeText, 200);
            } else {
              // All lines typed, wait then redirect
              setTimeout(() => {
                sessionStorage.setItem("splashShown", "true");
                setShowSplash(false);
                router.push("/");
              }, 800);
            }
          }, 400);
        }
      }
    };

    // Start typing after a short delay
    timeoutId = setTimeout(typeText, 300);

    // Auto-redirect after 6 seconds total (safety)
    const redirectTimeout = setTimeout(() => {
      sessionStorage.setItem("splashShown", "true");
      setShowSplash(false);
      router.push("/");
    }, 6000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  if (!showSplash) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-dark-900 flex items-center justify-center"
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-dark-900 to-neon-green/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_50%)]" />
            
            {/* Animated grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
                animation: "gridMove 20s linear infinite",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              {/* Typing text */}
              <div className="min-h-[200px] flex flex-col items-center justify-center">
                {currentLine === 0 && (
                  <motion.h1
                    key="line1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                  >
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </motion.h1>
                )}

                {currentLine === 1 && (
                  <motion.div
                    key="line2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4"
                  >
                    <h2 className="text-5xl md:text-7xl font-bold text-gradient neon-glow">
                      {displayText}
                      <span className="animate-pulse">|</span>
                    </h2>
                  </motion.div>
                )}

                {currentLine === 2 && (
                  <motion.p
                    key="line3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-4xl text-gray-300"
                  >
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </motion.p>
                )}
              </div>

              {/* Loading indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-2 mt-8"
              >
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </motion.div>
            </motion.div>
          </div>

          <style jsx>{`
            @keyframes gridMove {
              0% { transform: translate(0, 0); }
              100% { transform: translate(50px, 50px); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

