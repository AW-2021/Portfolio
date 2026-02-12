import { useState, useEffect } from "react";
import { motion, easeOut } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import CustomCursor from "../components/CustomCursor";
import LoadingScreen from "../components/LoadingScreen";
import { CgArrowTopRight } from "react-icons/cg";
import GridLines from "../components/GridLines";
import { HoverRouterLink } from "../components/HoverRouterLink";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const NotFoundPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen
          isLoading={isLoading}
          onComplete={() => setIsLoading(false)}
        />
      ) : (
        <>
          <CustomCursor />
          <Navbar />

          <motion.section
            className="min-h-screen w-11/12 m-auto grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 content-center relative z-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <GridLines />

            <div className="border-0 border-red-500 col-span-full flex flex-col items-center text-center gap-6 sm:gap-11 font-heading">
              {/* Main Heading */}
              <motion.h1
                variants={childVariants}
                className="border-0 border-cyan-500 font-bold tracking-tight text-[clamp(48px,10vw,160px)] leading-tight"
              >
                Page Not Found
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={childVariants}
                className="border-0 border-green-500 lg:text-[clamp(20px,76vw,28px)] tracking-tight font-medium leading-relaxed max-w-2xl"
              >
                It seems like this page doesn’t exist, or it’s gone.
                <br />
                But don’t worry! I’ll get you back on track :)
              </motion.p>

              {/* Back to home */}
              <motion.div
                variants={childVariants}
                className="border-0 border-yellow-500"
              >
                <p className="text-[22px] font-medium tracking-tight">
                  <HoverRouterLink>
                    Back to home <CgArrowTopRight className="inline" />
                  </HoverRouterLink>
                </p>
              </motion.div>
            </div>
          </motion.section>
          <Footer />
        </>
      )}
    </>
  );
};

export default NotFoundPage;
