import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { HoverRouterLink } from "./HoverRouterLink";
import { useScrollDirection } from "../hooks/useScrollDirection";
import GridLines from "./GridLines";
import { HoverLink } from "./HoverLink";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Navbar = () => {
  const controls = useAnimationControls();
  const direction = useScrollDirection();

  useEffect(() => {
    // Page load animation first
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    });
  }, []); // Empty dependency = run once on mount

  useEffect(() => {
    // Scroll animations after load
    if (direction === "down") {
      controls.start({
        y: "-100%",
        transition: { duration: 0.5, ease: "easeInOut" }
      });
    } else if (direction === "up" || direction === "none") {
      controls.start({
        y: 0,
        transition: { duration: 0.5, ease: "easeInOut" }
      });
    }
  }, [direction, controls]);

  return (
    <motion.nav
      id="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={controls}
      className="w-full m-auto h-[70px] fixed top-0 left-0 right-0 z-50 bg-light dark:bg-dark grid grid-cols-10 grid-rows-1"
      style={{ willChange: "transform" }}
    >
      <GridLines sectionId="navbar" />

      {/* Logo and links staggered in */}
      <motion.div 
        className="w-11/12 mx-auto flex justify-between items-center font-heading col-start-1 col-end-12 row-start-1 row-end-12"
        initial="hidden"  
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.4, delayChildren: 0.5 }
          }
        }}
      >
        <motion.a 
          href="/" 
          className="text-[min(3.1vw,1.35rem)] font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={itemVariants}
        >
          Amina Wasif
        </motion.a>

        <motion.div 
          className="flex space-x-1 sm:space-x-8 text-[min(3.1vw,1.25rem)] font-medium tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={itemVariants}
        >
          <HoverLink href="/#projects">Projects</HoverLink>
          <HoverLink href="/#about">About</HoverLink>
          <HoverRouterLink to='/contact'>Contact</HoverRouterLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={itemVariants}
        >
          <ThemeToggle />
        </motion.div>
      </motion.div>
      
      {/* Bottom line animation */}
      <motion.div
        className="w-11/12 mx-auto col-start-1 col-end-12 border-b border-1 border-text-light dark:border-text-dark origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.3, ease: "easeInOut", delay: 0.4 }}
      />
    </motion.nav>
  );
};

export default Navbar;
