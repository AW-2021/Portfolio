import { useLayoutEffect, useState } from "react";
import { motion, easeOut, type Variants } from "framer-motion";
import ParallaxImage from "../components/ParallaxImage";
import ImgWrapperFull from "../components/ImgWrapperFull";
import ImgWrapperHalf from "../components/ImgWrapperHalf";
import type { ProjectData } from "../lib/types";

const staggerTable: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.1 },
  },
};

const rowVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Custom hook to build the dynamic layout blocks for a project page
 * @param currProject - The current project data
 * @returns Array of React nodes representing the project layout */
const useProjectLayout = (currProject: ProjectData | undefined) => {
  const [renderBlocks, setRenderBlocks] = useState<React.ReactNode[]>([]);

  useLayoutEffect(() => {
    if (!currProject) return;

    const desc = currProject.description || [];
    const imgs = currProject.images || [];

    const blocks: React.ReactNode[] = [];
    const heroImg = imgs[0];

    // ✅ Hero image always first
    if (heroImg) {
      blocks.push(
        <ImgWrapperFull key={`hero-${0}`}>
          <ParallaxImage
            src={heroImg[1]}
            alt="Hero Image"
            travel={60}
            className="h-[485px] sm:h-[678px] md:h-[720px] lg:h-[762px]"
          />
        </ImgWrapperFull>
      );
    }

    // ✅ Always push first paragraph and table
    if (desc[0]) {
      blocks.push(
        <motion.p
          key={`desc-0`}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="col-span-full lg:col-start-6 lg:col-span-5 pt-6 pb-3 sm:pt-10 text-[clamp(18px,2.7vw,28px)] tracking-tight leading-relaxed font-normal"
        >
          {desc[0]}
        </motion.p>
      );

      {
        /* Spec table with staggered rows */
      }
      blocks.push(
        <motion.div
          key="spec-table"
          variants={staggerTable}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="col-span-full lg:col-start-6 lg:col-span-5 pb-6 pt-3 sm:pb-10 tracking-tight"
        >
          {[
            ["My Role", currProject?.role],
            ["Year", currProject?.year],
            ["Tech Stack", currProject?.techStack],
            ["Services Provided", currProject?.services],
          ].map(([label, value], idx, array) => (
            <motion.div
              key={idx}
              variants={rowVariant}
              className={`grid grid-cols-5 py-4 ${
                idx < array.length - 1 && "border-b-2"
              } border-dark/25 dark:border-light`}
            >
              <div className="col-span-2 text-[clamp(18px,2vw,24px)] font-normal">
                {label}:
              </div>
              <div className="col-start-3 col-span-3 text-[clamp(18px,2vw,24px)] font-medium pl-12">
                {typeof value !== "object" ? value : value.join(", ")}
              </div>
            </motion.div>
          ))}
        </motion.div>
      );
    }

    // 👉 Handle image[1] always between desc[0] and desc[1]
    const secondImg = imgs[1];
    const imageCount = imgs.length;
    const descCount = desc.length;

    // 👉 Case: more than 2 images but only 2 descs
    if (descCount === 2) {
      if (secondImg) blocks.push(renderImage(secondImg, 1));
      for (let i = 2; i < imageCount; i++) {
        blocks.push(renderImage(imgs[i], i));
      }
      blocks.push(renderParagraph(desc[1], 1));
    }

    // 👉 Case: more than 2 desc but only 2 images
    else if (descCount > 2 && imageCount === 2) {
      if (secondImg) blocks.push(renderImage(secondImg, 1));
      blocks.push(renderParagraph(desc[1], 1));
      for (let i = 2; i < descCount; i++) {
        blocks.push(renderParagraph(desc[i], i));
      }
    }

    // 👉 Case: more than 2 desc and more than 2 images
    else if (descCount > 2 && imageCount > 2) {
      const extraDescCount = descCount - 2;
      let startIndex = imageCount - extraDescCount;

      // Clamp startIndex to valid range
      if (startIndex < 1) startIndex = 1;
      if (startIndex >= imageCount) startIndex = imageCount - 1;

      // If image layout is "2", shift it with "1" image only if there are
      // 3 or more images before it, otherwise don't shift it away with 1
      if (startIndex >= 0 && startIndex < imgs.length && imgs[startIndex][0] === "2") {
        if (startIndex >= 3) startIndex -= 1;
        else startIndex += 1;
      }

      const betweenImages = imgs.slice(1, startIndex);
      const shiftedImages = imgs.slice(startIndex);

      // Render images between desc[0] and desc[1]
      betweenImages.forEach((img, idx) => {
        blocks.push(renderImage(img, idx + 1));
      });

      // Render desc[1]
      blocks.push(renderParagraph(desc[1], 1));

      // Alternate shifted images and remaining descriptions,
      // as long as their layout is "0".
      // If layout is "1", then it must be followed
      // by a layout "2", NOT a description paragraph
      let i = 0;
      let j = i;

      while (i < extraDescCount) {
        const img = shiftedImages[j];

        if (img) {
          blocks.push(renderImage(img, startIndex + j));
          if (img[0] === "1" && shiftedImages[j + 1]) {
            blocks.push(renderImage(shiftedImages[j + 1], startIndex + j + 1));
            j++;
          }
        }
        blocks.push(renderParagraph(desc[i + 2], i + 2));
        i++;
        j++;
      }
    }

    setRenderBlocks(blocks);
  }, [currProject]);

  // ✅ Helper: render a single paragraph
  const renderParagraph = (text: string, index: number) => (
    <motion.p
      key={`desc-${index}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="col-span-full lg:col-start-6 lg:col-span-5 py-8 text-[clamp(18px,2.7vw,28px)] tracking-tight leading-relaxed font-normal"
    >
      {text}
    </motion.p>
  );

  // ✅ Helper: render an image according to its layout type
  const renderImage = (img: string[] | undefined, index: number) => {
    if (!img) return null;
    const layout = img[0];
    const src = img[1];

    {
      /* Project image wide */
    }
    if (layout === "0") {
      return (
        <ImgWrapperFull key={`img-${index}`}>
          <ParallaxImage
            src={src}
            alt={`Project image ${index}`}
            travel={60}
            className="h-[424px] sm:h-[647px] md:h-[704px] lg:h-[762px]"
          />
        </ImgWrapperFull>
      );
    }

    {
      /* Two side-by-side images */
    }
    if (layout === "1" || layout === "2") {
      return (
        <ImgWrapperHalf key={`img-${index}`} position={layout}>
          <ParallaxImage
            src={src}
            alt={`Project image ${index}`}
            travel={70}
            className="h-[424px] sm:h-[647px] md:h-[704px] lg:h-[762px]"
          />
        </ImgWrapperHalf>
      );
    }

    return null;
  };

  return renderBlocks;
};

export default useProjectLayout;
