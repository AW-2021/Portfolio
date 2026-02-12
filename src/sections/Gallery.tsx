import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "motion/react";
import GridLines from "../components/GridLines";
import { useBatteryStatus } from "../hooks/useBatteryStatus";
import lightGallery1 from "../assets/images/gallery-images/light-gallery-1.jpg"
import lightGallery2 from "../assets/images/gallery-images/light-gallery-2.jpg"
import lightGallery3 from "../assets/images/gallery-images/light-gallery-3.jpg"
import lightGallery4 from "../assets/images/gallery-images/light-gallery-4.jpg"
import lightGallery5 from "../assets/images/gallery-images/light-gallery-5.jpg"
import lightGallery6 from "../assets/images/gallery-images/light-gallery-6.jpg"
import darkGallery1 from "../assets/images/gallery-images/dark-gallery-1.jpg"
import darkGallery2 from "../assets/images/gallery-images/dark-gallery-2.jpg"
import darkGallery3 from "../assets/images/gallery-images/dark-gallery-3.jpg"
import darkGallery4 from "../assets/images/gallery-images/dark-gallery-4.jpg"
import darkGallery5 from "../assets/images/gallery-images/dark-gallery-5.jpg"
import darkGallery6 from "../assets/images/gallery-images/dark-gallery-6.jpg"

const lightImages = [
  //"https://placehold.co/600x400",
  lightGallery1,
  lightGallery2,
  lightGallery3,
  lightGallery4,
  lightGallery5,
  lightGallery6,
];

const darkImages = [
  darkGallery1,
  darkGallery2,
  darkGallery3,
  darkGallery4,
  darkGallery5,
  darkGallery6,
];

export default function Gallery() {
  const { isLowBattery } = useBatteryStatus();

  // Reduce animation speed on low battery for better performance
  const baseSpeed = isLowBattery ? 40 : 80; // normal speed (px/sec)
  const slowSpeed = isLowBattery ? 10 : 15; // hover speed (px/sec)

  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const speed = useSpring(baseSpeed, { damping: 30, stiffness: 200 });

  const images = isDarkMode ? darkImages : lightImages;

  // total width of ONE set (you're already using fixed 600px)
  const totalWidth = images.length * 600;

  // Start at -totalWidth so L→R begins with a full row visible (no gap)
  useEffect(() => {
    x.set(-totalWidth);
  }, [totalWidth, x]);

  // Detect and track theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Watch for theme changes using MutationObserver
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Intersection Observer to detect when Gallery is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the gallery is visible
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

  // Move the carousel every frame (LEFT → RIGHT) - only when visible
  useAnimationFrame((_, delta) => {
    if (!isVisible) return; // Pause animation when off-screen

    const moveBy = (speed.get() * delta) / 1000;
    let newX = x.get() + moveBy; // move right

    // Wrap when we reach the origin (0)
    if (newX >= 0) {
      newX -= totalWidth;
    }

    x.set(newX);
  });

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="border-0 border-blue-500 w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 py-12 items-center relative z-1 overflow-hidden"
      onMouseEnter={() => speed.set(slowSpeed)}
      onMouseLeave={() => speed.set(baseSpeed)}
    >
      <GridLines />

      <motion.div style={{ x }} className="col-span-full h-full flex gap-6">
        {images.concat(images).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Portfolio ${i}`}
            // data-cursor="explore"
            className="lg:w-[600px] lg:h-[400px] md:w-[480px] md:h-[320px] w-[390px] h-[260px] object-cover"
          />
        ))}
      </motion.div>
    </section>
  );
}
