import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { skillsData } from "../data/skillsData";
import GridLines from "../components/GridLines";
import AnimatedBorder from "../components/AnimatedBorder";

/* Motion variants */
const leftColumnVariant: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.19, delayChildren: 0.14 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 100, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const iconVariant: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const listVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export const Skills = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="border-0 border-blue-500 min-h-screen w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 py-8 items-center relative z-1"
    >
      <GridLines />

      <div className="col-span-full h-full grid grid-cols-10 grid-rows-[auto_1fr] gap-y-8 sm:gap-y-16 border-0 border-red-500">
        {/* HEADING */}
        <div className="col-start-1 col-end-12 row-start-1 row-end-2 self-center font-heading font-semibold border-green-500 border-0">
          <p className="text-3xl">Skills</p>
          <AnimatedBorder />
        </div>

        {/* BOTTOM ROW */}
        <div className="col-start-1 col-end-12 row-start-2 row-end-3 border-0 border-orange-400 flex flex-col gap-y-7 sm:gap-y-0 sm:grid sm:grid-cols-5 lg:grid-cols-10">
          
          {/* Left Column */}
          <motion.div
            variants={leftColumnVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="sm:col-start-1 sm:col-end-3 lg:col-end-4 sm:pr-6 lg:pr-0"
          >
            <p className="font-heading text-[clamp(18px,3.4vw,1.5rem)] tracking-tight leading-relaxed font-medium">
              I am dedicated to expanding my knowledge and expertise in my
              field. Throughout my career, I've acquired various skills, which I
              continue to perfect.
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="sm:col-start-3 lg:col-start-5 sm:col-end-[-1] sm:self-start grid grid-cols-1 md:grid-cols-2 gap-y-6 sm:gap-y-12 sm:gap-x-8 lg:gap-x-16"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.28 }}
          >
            {skillsData.map((skill) => (
              <motion.article
                key={skill.title}
                className="flex flex-col gap-5 font-heading border-0 border-pink-500"
                variants={cardVariant}
              >
                {/* Icon + title row */}
                <motion.div
                  className="flex flex-col gap-6 sm:gap-3 lg:gap-2"
                  variants={iconVariant}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22 flex items-start text-dark dark:text-light">
                    <skill.Icon className="w-full h-full" />
                  </div>

                  <p className="text-[clamp(18px,3.4vw,1.5rem)] font-medium leading-tight tracking-tight">
                    {skill.title}
                  </p>
                </motion.div>

                {/* Tech Stack List */}
                <motion.div>
                  <ul className="flex flex-wrap justify-start gap-2 text-[min(2.9vw,1rem)] text-dark">
                    {skill.techStack.map((tech, index) => (
                      <motion.li
                        className="bg-dark/10 text-dark border border-black/20 rounded-md px-2 py-1 sm:px-3 lg:px-4 lg:py-2 dark:border-white/20 dark:bg-light/20 dark:text-light"
                        key={index}
                        variants={listVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{
                          once: true, amount: 0.2
                        }}
                        custom={index}
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
