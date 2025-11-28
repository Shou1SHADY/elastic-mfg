"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type Section = {
  id: string;
  color: string;
  content: React.ReactNode;
};

type Props = {
  sections: Section[];
};

export default function ScrollColorBackground({ sections }: Props) {
  const [bgColor, setBgColor] = useState(sections[0]?.color || "#000000");
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2; // middle of viewport

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const sec = sectionRefs.current[i];
        if (!sec) continue;
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          setBgColor(sections[i].color);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <motion.div
      style={{ backgroundColor: bgColor, transition: "background-color 0.5s" }}
    >
      {sections.map((section, i) => (
        <div
          key={section.id}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className="min-h-screen flex items-center justify-center"
        >
          {section.content}
        </div>
      ))}
    </motion.div>
  );
}
