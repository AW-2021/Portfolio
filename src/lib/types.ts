export interface ProjectData {
  id: number;
  title: string;
  overview: string;
  tag: string;
  description: string[];
  // images:[number,string][];
  images: string[][];
  client?: string;
  role: string;
  year: string;
  services: string[];
  techStack: string[];
  githubLink: string;
  liveLink?: string;
  platform?: string;    // Web, iOS, Android etc.
  status?: string;      // Completed, Deployed, In Progress
  industry?: string;    // "E-commerce", "Healthcare", "Education"   
  projectType?: string; // "Personal", "Client Work", "Open Source" 

}
