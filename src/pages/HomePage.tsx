import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Hero } from "../sections/Hero";
import LoadingScreen from "../components/LoadingScreen";
import CustomCursor from "../components/CustomCursor";
import Projects from "../sections/Projects";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Skills from "../sections/Skills";
import Gallery from "../sections/Gallery";
import Footer from "../sections/Footer";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "auto" });
      }
    }
  }, [location, isLoading]);

  return (
    <>
      <LoadingScreen
        isLoading={isLoading}
        onComplete={() => setIsLoading(false)}
      />
      {!isLoading && (
        <>
          <CustomCursor />
          <Navbar />
          <div className="w-11/12 m-auto">
            <Hero />
            <Projects />
            <About />
            <Experience />
            <Skills />
            <Gallery />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
