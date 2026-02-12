import { motion, useScroll, easeOut, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import GridLines from "../components/GridLines";
import Footer from "../sections/Footer";
import ContactForm from "../components/ContactForm";
import { HoverLink } from "../components/HoverLink";
import { CgArrowTopRight } from "react-icons/cg";

// Motion variants (container only staggers)
const staggerHeader: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

          <main className="w-11/12 m-auto">
            {/* Contact Page Content here */}
            <div
              id="hero"
              className="border-0 border-blue-500 min-h-screen w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 pt-56 sm:pt-72 items-center relative z-1 gap-y-1 font-heading"
            >
              <GridLines />

              {/* HEADER BLOCK (staggered) */}
              <motion.div
                className="border-0 border-red-500 col-span-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-y-4"
                variants={staggerHeader}
                initial="hidden"
                animate="visible"
              >
                <motion.h1
                  variants={fadeUp}
                  className="border-0 border-cyan-400 col-span-2 sm:col-span-2 lg:col-span-6 text-[clamp(48px,10vw,120px)] leading-[0.95] font-extrabold tracking-tight"
                >
                  Contact
                </motion.h1>

                <motion.div
                  className="col-span-full border-b border-1 border-text-light dark:border-text-dark origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.3, ease: "easeInOut", delay: 0.3 }}
                />
              </motion.div>

              {/* CONTENT BLOCK */}
              <div className="border-0 border-red-500 col-span-full lg:col-start-5 lg:col-end-[-1] pt-[32px] pb-[100px] sm:pt-[48px] lg:pt-[88px] lg:pb-[150px] flex flex-col gap-y-12 lg:gap-y-20">
                {/* Top Row */}
                <motion.div
                  className="border-0 border-purple-500 flex flex-col gap-y-3 sm:gap-y-6 font-medium"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <p className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[34px] leading-relaxed tracking-tight font-medium">
                    I’m looking forward to hearing from you! If you prefer not
                    to fill out forms, feel free to email me directly and let’s
                    talk about the next big thing!
                  </p>
                  <div className="border-0 border-yellow-500 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] tracking-tight">
                    <HoverLink
                      href="mailto:aminaw.dev@gmail.com"
                      target="_blank"
                    >
                      aminaw.dev@gmail.com{" "}
                      <CgArrowTopRight className="inline" />
                    </HoverLink>
                  </div>
                </motion.div>

                {/* Bottom Row */}
                <div className="border-0 border-green-500">
                  <ContactForm />
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </>
      )}
    </>
  );
};

export default ContactPage;
