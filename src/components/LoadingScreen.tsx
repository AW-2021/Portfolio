import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const LoadingScreen = ({
  isLoading,
  onComplete,
}: {
  isLoading: boolean;
  onComplete: () => void;
}) => {
  const textControls = useAnimationControls();
  const wrapperControls = useAnimationControls();

  // Enter/Exit animations based on isLoading state
  useEffect(() => {
    if (isLoading) {
      // Reset to visible state
      const enterAnimation = async () => {
        // Reset both wrapper and text instantly (no await, run in parallel)
        wrapperControls.set({ y: "0%" });
        textControls.set({ opacity: 0, scale: 0.95 });

        // Animate text in
        await textControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.7, ease: "easeInOut" },
        });
      };

      enterAnimation();
    } else {
      // Exit animation
      const exitAnimation = async () => {
        // Text fade out + scale up
        await textControls.start({
          opacity: 0,
          scale: 1.05,
          transition: { duration: 0.5, ease: "easeInOut" },
        });

        // Slide entire wrapper down
        await wrapperControls.start({
          y: "100%",
          transition: { duration: 0.4, ease: "easeInOut" },
        });

        onComplete();
      };

      exitAnimation();
    }
  }, [isLoading, textControls, wrapperControls, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-dark flex items-center justify-center z-[9999] pointer-events-none"
      initial={{ y: "0%" }}
      animate={wrapperControls}
    >
      <motion.span
        className="text-text-dark text-[1.5rem] font-medium font-heading"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={textControls}
      >
        Amina Wasif
      </motion.span>
    </motion.div>
  );
};

export default LoadingScreen;
