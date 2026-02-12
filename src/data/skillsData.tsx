import {
  Globe,
  OverlappingSquares,
  LoadingSpinner,
  SquareInCircle,
} from "../components/Icons";

type Skill = {
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  techStack: string[];
};

export const skillsData: Skill[] = [
  {
    title: "Frontend Development",
    description:
      "Crafting visually appealing and user-friendly interfaces that create intuitive and seamless experiences.",
    Icon: function IconDigital() {
      return (
        <OverlappingSquares size={78} strokeWidth={1.25} className="text-text-light dark:text-text-dark" />
      );
    },
    techStack: [
      "React",
      "React Native",
      "Next.js",
      "HTML",
      "CSS",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "Framer Motion",
    ]
  },
  {
    title: "Backend Development",
    description:
      "Defining product's vision, strategizing the approach, and setting both short & long term goals.",
    Icon: function IconStrategy() {
      return <Globe size={76} strokeWidth={1.25} className="text-text-light dark:text-text-dark" />;
    },
    techStack: [
      "Node.js",
      "Express",
      "PHP",
      "MongoDB",
      "Supabase",
      "Firebase",
      "MySQL",
    ]
  },
  {
    title: "UI Design",
    description:
      "The most efficient platform to implement web solutions and publish websites with one click.",
    Icon: function IconFramer() {
      return (
        <SquareInCircle size={76} strokeWidth={1.25} className="text-text-light dark:text-text-dark" />
      );
    },
    techStack: [
      "Figma",
      "Canva",
      "Framer",
    ]
  },
  {
    title: "Testing & Tools",
    description:
      "Establishing a strong foundation to set the project's tone, providing a clear & organized starting point.",
    Icon: function IconArt() {
      return (
        <LoadingSpinner size={76} strokeWidth={1.25} className="text-text-light dark:text-text-dark" />
      );
    },
    techStack: [
      "Git",
      "GitHub",
      "Postman",
      "Vercel",
      "Render",
    ]
  },
];