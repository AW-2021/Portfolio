import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HoverRouterLinkProps {
  to?: string;
  children: React.ReactNode;
}

export const HoverRouterLink = ({
  to = "/",
  children,
}: HoverRouterLinkProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link to={to}>
      <p
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
              className="absolute bottom-0 left-0 h-[2px] bg-text-light dark:bg-text-dark"
            />
          )}
        </AnimatePresence>
      </p>
    </Link>
  );
};
