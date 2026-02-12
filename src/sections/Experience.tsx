import { motion, easeOut } from "framer-motion";
import { experiencesData } from "../data/experiences";
import GridLines from "../components/GridLines";
import AnimatedBorder from "../components/AnimatedBorder";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.38,
    },
  },
};

const rowVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-0 border-blue-500 sm:min-h-screen w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 py-8 items-center relative z-1"
    >
      <GridLines />

      <div className="col-span-full h-full grid grid-cols-10 grid-rows-[auto_1fr] gap-y-8 sm:gap-y-16 border-0 border-red-500">
        {/* HEADING */}
        <div className="col-start-1 col-end-12 row-start-1 row-end-2 self-center font-heading font-semibold border-green-500 border-0">
          <p className="text-3xl">Experience</p>
          <AnimatedBorder />
        </div>

        {/* BOTTOM ROW */}
        <div className="col-start-1 col-end-12 row-start-2 row-end-3 border-0 border-orange-400 flex flex-col gap-y-5 sm:gap-y-0 sm:grid sm:grid-cols-5 lg:grid-cols-10">
          
          {/* Left Column */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="sm:col-start-1 sm:col-end-3 lg:col-end-4 border-0 border-purple-500 sm:pr-4 lg:pr-0"
          >
            <p className="font-heading text-[clamp(18px,3.2vw,1.5rem)] tracking-tight leading-relaxed font-medium">
              I've worked with companies at full-time roles & with clients as a freelancer. I enjoy collaborating with clients who
              appreciate the importance of striking balance between functionality & user experience.
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="sm:col-start-3 lg:col-start-5 sm:col-end-[-1] w-full grid grid-cols-3 sm:gap-4 sm:h-[60%] font-heading font-medium text-[clamp(16px,3vw,1.3rem)] border-0 border-orange-600"
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {experiencesData.map((exp, index, array) => (
              <motion.div
                key={index}
                variants={rowVariant}
                className={`h-full col-span-3 grid grid-cols-3 ${index < array.length - 1 && 'border-b-2'} py-4 sm:py-0 border-dark/25 dark:border-light`}
              >
                <div>{exp.company}</div>
                <div className="text-center sm:text-start">{exp.role}</div>
                <div className="text-right">{exp.date}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
