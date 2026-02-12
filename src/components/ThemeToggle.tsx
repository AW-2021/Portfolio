import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BsMoonStars, BsMoonStarsFill } from "react-icons/bs";
import useScreenSize from "../hooks/useScreenSize";

export const ThemeToggle = () => {
  const storedTheme = localStorage.getItem("theme");
  const initialTheme: boolean = storedTheme === "dark";

  const [darkMode, setDarkMode] = useState<boolean>(initialTheme);
  const screenSize = useScreenSize();


  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prevMode) => !prevMode)}
      className="w-15 h-8 sm:w-20 sm:h-10 flex items-center justify-between border border-text-light rounded-full p-1 bg-transparent cursor-pointer dark:bg-dark dark:border-text-dark"
    >
      <motion.span
        className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-lg sm:text-[1.35rem] rounded-full ${
          !darkMode && "bg-text-light text-light"
        }`}
        animate={{ scale: darkMode ? 1 : 1.1 }}
        transition={{ duration: 0.3 }}
      >
        ✴︎
      </motion.span>

      <motion.span
        className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-base sm:text-lg rounded-full ${
          darkMode && "bg-text-dark text-dark"
        }`}
        animate={{ scale: darkMode ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <BsMoonStars size={screenSize === "xs" ? 13.5 : 17}/>
      </motion.span>
    </button>
  );
};
