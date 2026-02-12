import { motion } from "framer-motion";
import about2 from "../assets/images/about-2.jpg";
import GridLines from "../components/GridLines";
import AnimatedBorder from "../components/AnimatedBorder";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] as const },
  },
};

/* const imageVariant = {
  hidden: { scale: 0.95, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const },
  },
}; */

const About = () => {
  return (
    <section
      id="about"
      className="border-0 border-blue-500 min-h-screen w-full grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 py-16 items-center relative z-1"
    >
      <GridLines />

      <motion.div
        className="col-span-full h-full grid grid-cols-10 grid-rows-[auto_1fr] gap-y-8 sm:gap-y-16 border-0 border-red-500"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* HEADING */}
        <div className="col-start-1 col-end-12 row-start-1 row-end-2 self-center font-heading font-semibold border-green-500 border-0">
          <p className="text-3xl">About</p>
          <AnimatedBorder />
        </div>

        {/* BOTTOM ROW */}
        <div className="col-start-1 col-end-12 row-start-2 row-end-3 border-0 border-orange-400 flex flex-col gap-y-9 sm:gap-y-0 sm:gap-x-1 md:gap-x-3 lg:gap-x-0 sm:grid sm:grid-cols-5 lg:grid-cols-10">
          {/* Left Column */}
          <motion.div
            variants={textVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="sm:col-start-1 sm:col-end-7 sm:self-start border-0 border-blue-500"
          >
            <p className="text-[clamp(20px,3vw,2.1rem)] leading-normal tracking-tight font-medium font-heading">
              Hi, I'm Amina, a full-stack web and mobile developer, with
              an interest in design. With a background in
              computer science and web development, I specialize in creating
              engaging user experiences through interactive design &
              meaningful features. As a creative builder, I treat every app as a digital experience for the end user and an opportunity for me to learn, explore & create impact.
            </p>
          </motion.div>

          {/* Right Column */}
          <div className="border-0 border-purple-500 sm:col-start-8 sm:col-end-12 sm:self-start h-[430px] sm:h-[460px] md:h-[540px] lg:h-[580px]">
            <motion.img
              src={about2}
              alt="About Me image"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{
                duration: 1.0,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1,
              }}
              viewport={{ once: true }}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
