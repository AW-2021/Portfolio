import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import Project from "../components/Project";
// import ProjectOld from "../components/ProjectOld";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";

const ProjectPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const { id } = useParams();
  const projId = Number(id);
  const currProject = projectsData.find((el) => el.id === projId);
  const nextProject = projectsData.find((el) => el.id === projId + 1);

  // Check if project exists, redirect if not
  useEffect(() => {
    const exists = projectsData.some((p) => String(p.id) === String(id));
    if (!exists) {
      navigate("/", { replace: true });
    }
  }, [id, navigate]);

  // Reset loading state when id changes
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

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
          <main className="w-11/12 m-auto">
            {/* Project Page Content here */}
            <Project currProject={currProject} nextProject={nextProject} />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default ProjectPage;
