import { motion, type Variants } from "framer-motion";
import GridLines from "./GridLines";
import { CgArrowTopRight } from "react-icons/cg";
import { HoverLink } from "./HoverLink";
import { Link } from "react-router-dom";
import type { ProjectData } from "../lib/types";
import useProjectLayout from "../hooks/useProjectLayout";

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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface ProjectProps {
  currProject: ProjectData | undefined;
  nextProject: ProjectData | undefined;
}

const Project = ({ currProject, nextProject }: ProjectProps) => {
  // Use custom hook to build dynamic layout blocks
  const renderBlocks = useProjectLayout(currProject);

  return (
    <div
      id="hero"
      className="border-0 border-blue-500 min-h-screen w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 pt-72 pb-16 items-center relative z-1 gap-y-5 sm:gap-y-8 font-heading"
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
          className="border-0 border-cyan-400 col-span-full lg:col-span-6 text-[clamp(48px,10vw,120px)] leading-[0.95] font-extrabold tracking-tight"
        >
          {currProject?.title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="border-0 border-purple-500 col-start-1 col-end-[-1] sm:col-end-5 lg:col-start-7 lg:col-span-4 justify-self-start self-end text-[clamp(18px,2.7vw,28px)] tracking-tight font-medium lg:text-start mt-1 sm:mt-4 lg:mt-0"
        >
          {currProject?.overview}
        </motion.p>

        <motion.div
          className="col-span-full border-b border-1 border-text-light dark:border-text-dark origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut", delay: 0.3 }}
        />

        <motion.div
          variants={fadeUp}
          className="border-0 border-green-500 col-span-full lg:col-start-7 lg:col-end-12 justify-self-end tracking-tight font-medium text-[clamp(16px,1.7vw,24px)] flex gap-2 lg:gap-8"
        >
          <HoverLink href={currProject?.githubLink || ""} target="_blank">
            View GitHub page <CgArrowTopRight className="inline align-middle" />
          </HoverLink>

          {currProject?.liveLink && (
            <HoverLink href={currProject?.liveLink} target="_blank">
              View live website{" "}
              <CgArrowTopRight className="inline align-middle" />
            </HoverLink>
          )}
        </motion.div>
      </motion.div>

      {/* DYNAMIC LAYOUT */}
      {renderBlocks}

      {/* NEXT PROJECT BLOCK */}
      {nextProject && (
        <motion.div
          variants={staggerHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="col-span-full h-full grid grid-cols-10 grid-rows-[auto_1fr] gap-y-5 sm:gap-y-11 py-10 lg:py-16"
        >
          {/* Heading */}
          <motion.div
            variants={fadeUp}
            className="col-span-full row-start-1 row-end-2 self-center font-heading font-semibold"
          >
            <p className="text-2xl tracking-tight uppercase">Next Project</p>
            <motion.div
              className="mt-4 border-b border-1 border-text-light dark:border-text-dark origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Bottom Row */}
          <motion.div
            variants={fadeUp}
            className="col-span-full row-start-2 row-end-3 self-center py-0 sm:py-6 flex flex-col-reverse gap-6 sm:gap-0 sm:grid sm:grid-cols-5 lg:grid-cols-10 border-0"
          >
            {/* Left: Text */}
            <div className="sm:col-start-1 sm:col-end-3 lg:col-end-4 flex flex-col items-start justify-between gap-2 py-0 sm:py-4 border-0 border-pink-400">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[min(4.7vw,2.5rem)] font-medium tracking-tight"
              >
                {nextProject?.title}
              </motion.h3>
              <div className="flex flex-col items-start gap-6">
                <p className="text-[clamp(17px,2.2vw,1.36rem)] leading-[1.4] font-heading font-medium tracking-tight dark:text-light lg:pr-4">
                  {nextProject?.overview}
                </p>
                <p className="inline-block bg-accent-light-2 dark:bg-accent-dark-2 text-dark dark:text-light px-3 py-[0.6rem] text-[min(3.2vw,1.125rem)] leading-[1.5556] rounded-sm font-heading">
                  {nextProject?.tag}
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="sm:col-start-3 sm:col-span-3 lg:col-start-4 lg:col-end-12 sm:self-center h-[400px] md:h-[500px] lg:h-[650px] max-h-[650px] overflow-hidden">
              <Link to={`/projects/${nextProject.id}`}>
                <motion.img
                  src={nextProject?.images[0][1]}
                  alt={`Screenshot of ${nextProject?.title} project`}
                  data-cursor="explore"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{
                    duration: 1.3,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.2,
                  }}
                  viewport={{ once: true }}
                  className="w-full h-full object-cover group-hover:scale-105"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Project;
