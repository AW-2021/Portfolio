import { motion, useScroll, useTransform, easeOut } from "framer-motion";
import { useRef } from "react";
import GridLines from "../components/GridLines";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

const itemVariants2 = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
      delay: 1.4,
    },
  },
};

export const Hero = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Create opposing scroll-based parallax transforms
  const xMain = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const xSub = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={ref}
      id="hero"
      className="border-0 border-blue-500 min-h-screen w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 items-center content-center relative z-1 overflow-hidden "
    >
      <GridLines />

      <motion.div
        className="col-span-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 grid-rows-4 lg:grid-rows-3 gap-y-0 xl:gap-y-6 border-0 border-red-500"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="col-start-1 col-end-12 row-start-1 row-end-2 justify-self-center self-center lg:self-end border-green-400 border-0 text-[clamp(48px,11vw,10rem)] leading-[1.1] font-light tracking-tighter"
          style={{ x: xMain }}
          variants={itemVariants}
        >
          <motion.span
            className="mr-2 lg:mr-4 inline-block font-semibold"
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          >
            ✳︎
          </motion.span>
          I'm Amina Wasif
        </motion.h1>

        <div className="col-span-full row-start-2 row-end-4 lg:row-end-3 font-heading flex flex-col-reverse lg:flex-row flex-nowrap gap-y-4 sm:gap-y-6 lg:gap-x-2 xl:gap-x-10 items-center justify-center lg:pt-4 border-0 border-yellow-400">
          <motion.p
            className="w-[90%] lg:w-auto lg:max-w-[42%] xl:max-w-[34%] text-[clamp(18px,2.4vw,1.75rem)] leading-relaxed font-medium tracking-tight border-green-400 border-0"
            variants={itemVariants2}
          >
            With over 1 year of experience, I ask the necessary questions to visualize & create apps that focus on &
            prioritize people and presence
          </motion.p>

          <motion.span
            className="w-[90%] lg:w-auto text-right lg:text-left text-[clamp(48px,10vw,10rem)] font-bold tracking-tighter border-0 border-cyan-500"
            variants={itemVariants}
          >
            A developer
          </motion.span>
        </div>

        <motion.span
          className="col-span-full row-start-4 lg:row-start-3 row-span-1 self-center lg:self-start justify-self-center text-[clamp(48px,11vw,10rem)] font-light font-heading tracking-tighter sm:leading-snug lg:leading-tight border-0 border-cyan-500 "
          style={{ x: xSub }}
          variants={itemVariants}
        >
          codes by design
        </motion.span>
      </motion.div>
    </section>
  );
};
