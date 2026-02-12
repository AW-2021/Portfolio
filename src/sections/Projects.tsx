import { motion } from "framer-motion";
import { useRef } from "react";
import { projectsData } from "../data/projectsData";
import GridLines from "../components/GridLines";
import { Link } from "react-router-dom";
import AnimatedBorder from "../components/AnimatedBorder";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

/* const itemVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}; */

const Projects = () => {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="projects"
      className="border-0 border-blue-500 min-h-screen w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 items-center relative z-1"
    >
      <GridLines />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="col-span-full grid grid-cols-10 grid-rows-[auto_repeat(4,1fr)] gap-y-5 sm:gap-y-11 border-0 border-red-500"
      >
        {/* HEADING */}
        <div className="col-start-1 col-end-12 row-start-1 row-end-2 self-center font-heading font-semibold border-green-500 border-0">
          <div className="flex justify-between items-center">
            <p className="text-3xl">Featured Work</p>
            <p className="text-xl font-medium animate-bounce">Scroll ↓</p>
          </div>
          <AnimatedBorder />
        </div>

        {projectsData.map((project, index) => (
          <div
            key={index}
            className="col-start-1 col-end-12 row-span-1 self-center py-0 sm:py-6 flex flex-col-reverse gap-6 sm:gap-0 sm:grid sm:grid-cols-5 lg:grid-cols-10 border-0"
          >
            {/* LEFT: TEXT */}
            <div className="sm:col-start-1 sm:col-end-3 lg:col-end-4 flex flex-col items-start justify-between gap-2 py-0 sm:py-4 border-0 border-pink-400">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[min(4.7vw,2.5rem)] font-medium tracking-tight"
              >
                {project.title}
              </motion.h3>
              <div className="flex flex-col items-start gap-6">
                <p className="text-[clamp(17px,2.2vw,1.36rem)] leading-[1.4] font-heading font-medium tracking-tight lg:pr-4">
                  {project.overview}
                </p>
                <p className="inline-block bg-accent-light-2 dark:bg-accent-dark-2 text-dark dark:text-light px-3 py-[0.6rem] text-[min(3.2vw,1.125rem)] leading-[1.5556] rounded-sm font-heading">
                  {project.tag}
                </p>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="sm:col-start-3 sm:col-span-3 lg:col-start-4 lg:col-end-12 sm:self-center h-[400px] md:h-[500px] lg:h-[650px] max-h-[650px] overflow-hidden">
              <Link to={`/projects/${project.id}`}>
                <motion.img
                  src={project.images[0][1]}
                  alt={`Screenshot of ${project.title} project`}
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
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
