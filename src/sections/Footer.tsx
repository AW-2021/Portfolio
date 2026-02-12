import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useSpring,
} from "motion/react";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { HoverLink } from "../components/HoverLink";
import useScreenSize from "../hooks/useScreenSize";
import { useBatteryStatus } from "../hooks/useBatteryStatus";
import GridLines from "../components/GridLines";
import { Link } from "react-router-dom";
import { CgArrowTopRight } from "react-icons/cg";

export default function Footer() {
  const screenSize = useScreenSize();
  const { isLowBattery } = useBatteryStatus();

  // Reduce animation speed on low battery for better performance
  const baseSpeed = isLowBattery ? 45 : 90; // px/sec
  const x = useMotionValue(0);
  const speed = useSpring(baseSpeed, { damping: 30, stiffness: 200 });

  const marqueeText = [
    "Let's work together ✳︎",
    "Let's work together ✳︎",
    "Let's work together ✳︎",
  ];

  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Measure rendered width once DOM is ready
  useLayoutEffect(() => {
    if (marqueeRef.current) {
      setTotalWidth(marqueeRef.current.scrollWidth / 2);
      // divide by 2 since we duplicated content
    }
  }, [screenSize]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the footer is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Marquee movement in reverse direction - only when visible
  useAnimationFrame((_, delta) => {
    if (!totalWidth || !isVisible) return;

    const moveBy = (speed.get() * delta) / 1000;
    let newX = x.get() - moveBy;

    // Measure approximate text width dynamically for reset
    if (newX <= -totalWidth) {
      newX += totalWidth;
    }

    x.set(newX);
  });

  return (
    <motion.section
      ref={sectionRef}
      id="footer"
      initial={{}}
      whileInView={{}}
      transition={{}}
      className="w-full m-auto border-0 border-blue-500 min-h-screen grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 pb-12 pt-20 sm:pb-0 lg:pb-2 lg:pt-4 items-end sm:items-center relative z-1 bg-dark dark:bg-light text-text-dark dark:text-text-light font-heading overflow-hidden"
    >
      <GridLines sectionId="footer" />

      {/* Marquee */}
      <div className="border-0 border-pink-500 col-span-full overflow-hidden">
        <motion.div
          ref={marqueeRef}
          style={{ x }}
          className="flex gap-9 whitespace-nowrap"
        >
          {marqueeText.concat(marqueeText).map((text, i) => (
            <span
              key={i}
              className="font-semibold tracking-tighter text-[clamp(120px,15vw,220px)]"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Contact content */}
      <div className="border-0 border-cyan-500 w-11/12 mx-auto col-span-full flex flex-col-reverse gap-14 sm:gap-0 sm:grid sm:grid-cols-5 lg:grid-cols-10 items-center">
        <div className="sm:col-start-1 sm:col-end-2 flex flex-col flex-wrap items-start justify-center gap-5 lg:gap-6 text-base sm:text-lg lg:text-xl">
          <HoverLink
            sectionId="footer"
            href="https://github.com/AW-2021"
            target="_blank"
          >
            GitHub <CgArrowTopRight className="inline" />
          </HoverLink>
          <HoverLink
            sectionId="footer"
            href="https://www.linkedin.com/in/aminawasif"
            target="_blank"
          >
            LinkedIn <CgArrowTopRight className="inline" />
          </HoverLink>
          <HoverLink
            sectionId="footer"
            href="https://www.upwork.com/freelancers/~01adc65cc7d91ffe79?mp_source=share"
            target="_blank"
          >
            Upwork <CgArrowTopRight className="inline" />
          </HoverLink>
          <HoverLink
            sectionId="footer"
            href="https://instagram.com"
            target="_blank"
          >
            Instagram <CgArrowTopRight className="inline" />
          </HoverLink>
        </div>

        <div className="col-span-full sm:col-start-4 sm:col-end-6 lg:col-start-8 lg:col-span-3 flex flex-col items-center sm:items-start gap-y-[22px] sm:gap-y-6">
          <p className="leading-normal tracking-tight text-lg sm:text-xl lg:text-2xl text-center sm:text-start">
            I’m currently available for new work, let me know if you need a web or mobile
            developer. I’d love to talk about the next big thing!
          </p>
          <Link to="/contact" className="bg-text-dark dark:bg-text-light text-dark dark:text-light tracking-tight text-base lg:text-lg py-2 px-3 rounded-full hover:px-6 hover:font-medium transition-all duration-300 ">Send a message ➔</Link>
        </div>
      </div>

      {/* Footer */}
      <div className="w-11/12 mx-auto col-span-full flex flex-col gap-4 pt-4 sm:pt-7 sm:flex-row sm:gap-0 sm:justify-between items-center text-base sm:text-lg lg:text-xl font-medium">
        <HoverLink
          sectionId="footer"
          href="mailto:aminaw.dev@gmail.com"
          target="_blank"
        >
          aminaw.dev@gmail.com
        </HoverLink>
        <p>© Crafted with care.</p>
        {screenSize !== "xs" && (
          <HoverLink sectionId="footer" href="#hero">
            ↑ Back to top
          </HoverLink>
        )}
      </div>
    </motion.section>
  );
}
