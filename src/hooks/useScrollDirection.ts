import { useEffect, useState } from "react";

export const useScrollDirection = () => {
  const [direction, setDirection] = useState<"up" | "down" | "none">("none");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // If user is near the top, always show navbar
      if (currentScrollY < 50) {
        setDirection("none");
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY + 3) // Sensitivity for downward scroll 
      {
        setDirection("down");
      } else if (currentScrollY < lastScrollY - 3) {
        setDirection("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return direction;
};
