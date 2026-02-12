import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface HoverLinkProps {
  href: string; 
  children: React.ReactNode;
  target?: string;
  rel?: string;
  sectionId?: string;
}

export const HoverLink = ({ href, children, target = "_self", rel = "noopener noreferrer", sectionId }: HoverLinkProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative inline-block px-1"
    >
      <span>{children}</span>

      <AnimatePresence>
        {isHover && (
          <motion.span
            key="underline"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.4, ease: [0.645, 0.045, 0.355, 1] }} // Custom cubic-bezier
            className={`absolute bottom-0 left-0 h-[2px] ${sectionId !== 'footer' ? 'bg-text-light dark:bg-text-dark' : 'dark:bg-text-light bg-text-dark'}`}
          />
        )}
      </AnimatePresence>
    </a>
  );
};
