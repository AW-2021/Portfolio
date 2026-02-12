import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { throttle } from "../utils/throttle";
import { useBatteryStatus } from "../hooks/useBatteryStatus";

const CustomCursor = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [explore, setExplore] = useState<boolean>(false); // Detect explore target
  const [isFooter, setIsFooter] = useState<boolean>(false); // Detect footer section

  const { isLowBattery } = useBatteryStatus();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Reduce spring stiffness on low battery for better performance
  const springConfig = isLowBattery
    ? { stiffness: 240, damping: 38 }
    : { stiffness: 500, damping: 30 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = throttle((e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }, 14);

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // General hover (links, buttons, etc)
  useEffect(() => {
    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    const hoverables = document.querySelectorAll("a, button, .cursor-hover");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  // Detect elements with data-cursor="explore"
  useEffect(() => {
    const handleExploreEnter = () => setExplore(true);
    const handleExploreLeave = () => setExplore(false);

    const exploreElements = document.querySelectorAll(
      "[data-cursor='explore']"
    );
    exploreElements.forEach((el) => {
      el.addEventListener("mouseenter", handleExploreEnter);
      el.addEventListener("mouseleave", handleExploreLeave);
    });

    return () => {
      exploreElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleExploreEnter);
        el.removeEventListener("mouseleave", handleExploreLeave);
      });
    };
  }, []);

  // Detect footer section
  useEffect(() => {
    const handleFooterEnter = () => setIsFooter(true);
    const handleFooterLeave = () => setIsFooter(false);

    const footerSection = document.getElementById("footer");

    footerSection?.addEventListener("mouseenter", handleFooterEnter);
    footerSection?.addEventListener("mouseleave", handleFooterLeave);

    return () => {
      footerSection?.removeEventListener("mouseenter", handleFooterEnter);
      footerSection?.removeEventListener("mouseleave", handleFooterLeave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ translateX: springX, translateY: springY }}
    >
      {/* Outer scale circle */}
      <motion.div
        className={`w-4 h-4 rounded-full border ${
          !isFooter
            ? "border-black dark:border-white"
            : "dark:border-black border-white"
        } flex items-center justify-center`}
        animate={{
          scale: explore ? 8 : hovered ? 2.5 : 1,
          backgroundColor: explore
            ? "rgba(0,0,0,0.7)"
            : hovered
            ? "rgba(0,0,0,0.1)"
            : "transparent",
          border: explore ? "0" : "",
          backdropFilter: explore ? "blur(1px)" : "",
        }}
        transition={
          explore
            ? {
                type: "tween",
                ease: "easeOut",
                duration: 0.4,
              }
            : {
                type: "spring",
                stiffness: 300,
                damping: 20,
              }
        }
      >
        {/* Inner text NOT affected by outer scale */}
        {explore && (
          <div className="font-body absolute text-white text-sm pointer-events-none scale-[0.2]">
            Explore
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
