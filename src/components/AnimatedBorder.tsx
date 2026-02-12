import { motion } from "framer-motion";

const AnimatedBorder = () => {
  return (
    <motion.div
      className="mt-4 border-b border-1 border-text-light dark:border-text-dark origin-left"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.3, ease: "easeInOut" }}
    />
  );
};

export default AnimatedBorder;
