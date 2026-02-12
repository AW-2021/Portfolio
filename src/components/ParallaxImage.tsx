import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useScreenSize from "../hooks/useScreenSize";

type ParallaxImageProps = {
  src: string;
  alt: string;
  travel?: number; // how much image should travel vertically across the wrapper (in px)
  className?: string;
};

function ParallaxImage({
  src,
  alt,
  travel = 70,
  className = "",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // smooth, continuous mapping while the wrapper passes the viewport
  });

  // Responsive parallax settings
  // xs (< 640px): no parallax
  // sm/md (640-1023px): reduced parallax (30px travel, 80px bleed)
  // lg (>= 1024px): full parallax (60-70px travel, 160px bleed)
  const isLarge = screenSize === "lg";
  const isMedium = screenSize === "sm" || screenSize === "md";
  const isSmall = screenSize === "xs";

  const effectiveTravel = isLarge ? travel : isMedium ? 30 : 0;
  const verticalOffset = isLarge ? -60 : isMedium ? -30 : 0;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-effectiveTravel + verticalOffset, effectiveTravel + verticalOffset]
  );

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-none ${className}`}
      style={{ willChange: "transform" }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={isSmall ? {} : { y, willChange: "transform" }}
        className={`
          block w-full
          ${isLarge ? "h-[calc(100%+160px)]" : isMedium ? "h-[calc(100%+80px)]" : "h-full"}
          object-cover object-center
          select-none
          pointer-events-none
        `}
        draggable={false}
      />
    </div>
  );
}

export default ParallaxImage;
