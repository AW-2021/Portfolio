import type { ProjectData } from "../lib/types";

// Dynamically import all project images using Vite's import.meta.glob
const allProjectImages = import.meta.glob<{ default: string }>(
  "../assets/images/project-images/**/*.png",
  { eager: true },
);

// Helper function to get images for a specific project folder with layout specifications
// layouts: array of "0" (full width), "1" (left half), "2" (right half)
const getProjectImages = (folder: string, layouts: string[]) => {
  const images = Object.entries(allProjectImages)
    .filter(([path]) => path.includes(`/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, module]) => module.default);

  return layouts
    .map((layout, i) => [layout, images[i]])
    .filter(([, img]) => img);
};

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "React Jobs Finder",
    overview:
      "LinkedIn-Inspired Job Board for React jobs with real-time updates",
    tag: "Web Dev",
    description: [
      "React Jobs Finder is a full-stack job board application with real-time synchronization. Users authenticate securely to browse, add, edit, and delete job listings. Changes made by any user appear instantly across all connected browsers. The responsive interface features toast notifications, loading states, and protected routing.",
      "The platform creates structured relationships between companies and jobs. Each listing displays comprehensive details including position type, salary, location, and company information. The modern Tailwind CSS interface adapts seamlessly across desktop, tablet, and mobile devices.",
      "Built with React 19, TypeScript, and Vite 7 for fast, type-safe development. Supabase provides PostgreSQL database, authentication, Row Level Security, and real-time WebSocket subscriptions. React Router 7 loaders fetch data before rendering, eliminating loading flicker.",
      "Context API manages authentication state through AuthContext. Custom hooks like useRealtimeJobs subscribe to database changes via PostgreSQL's REPLICA IDENTITY FULL. The ProtectedRoute component guards sensitive routes and redirects unauthenticated users.",
      "Database tables use foreign key constraints with cascading deletes for referential integrity. Version-controlled migrations through Supabase CLI enable reproducible local development. Real-time events (INSERT, UPDATE, DELETE) trigger intelligent state updates without page refreshes.",
      "Complete local development setup with Supabase CLI running PostgreSQL, authentication, and API locally. Auto-generated TypeScript types from database schema ensure compile-time validation. Component architecture separates concerns across pages, layouts, components, contexts, and hooks.",
      "React Router loaders handle data fetching patterns. Singleton Supabase client manages connections. Comprehensive error handling delivers user-facing toast messages and developer console logging. Security follows best practices with Supabase Auth, session persistence, and synchronized state listeners.",
    ],
    images: getProjectImages("rj", ["0", "0", "1", "2", "0", "1", "2"]),
    role: "Full-Stack Developer",
    year: "2026",
    services: ["Web Development", "Database Setup", "Web Design"],
    techStack: [
      "React 19",
      "TypeScript",
      "Supabase",
      "React Router 7",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/AW-2021/React-Jobs-Finder",
  },
  {
    id: 2,
    title: "GPT Assist",
    overview:
      "Robust Chatbot & AI assistant with a library of pre-built prompts",
    tag: "Web Dev",
    description: [
      "GPT Assist is a web-based AI writing assistant that helps users create professional content across multiple domains. The platform provides 100+ pre-designed prompts for social media, blog articles, YouTube scripts, LinkedIn content, and copywriting. Users access prompts through a searchable library and generate AI-powered content with a single click.",
      "The integrated TinyMCE rich text editor allows users to refine and format content before saving or exporting. The application features a project management system where users create folders, upload files, and group related content. All generated content can be saved as files within projects for easy organization.",
      "The platform solves professional challenges for content creators, marketers, and businesses by saving time on ideation and drafting. The freemium business model offers a Free Plan with 100+ prompts and limited projects. The Pro Plan ($19/month or $147/year) unlocks unlimited content generation, unlimited projects, and priority support.",
      "Key differentiators include OpenAI's advanced language models combined with a curated prompt library. The TinyMCE editor integration eliminates context-switching between tools. Stripe payment integration handles secure billing with monthly and annual options. The custom prompt feature enables users to build a personalized knowledge base.",

      // TECHNICAL IMPLEMENTATION
      "Built on the MERN stack with React 18.2, Express.js 4.18, MongoDB Atlas, and Node.js. The frontend uses React Router v6 for client-side routing across 12 pages. Tailwind CSS v3 provides utility-first responsive styling with Material-UI v5 for complex components.",
      "The Express.js backend implements RESTful API architecture with seven route handlers managing authentication, prompts, chat, files, projects, users, and payments. Mongoose ODM defines four data models with proper schemas and validation. The API uses middleware chain with JSON parsing and CORS handling.",
      "MongoDB database schema includes User model with bcrypt password hashing, Prompt model with 15+ category enums, File model with upload timestamps, and Project model with nested file references. All models use proper indexing on unique fields. Foreign key relationships enable cascading operations and maintain referential integrity.",
      "OpenAI API integration uses the JavaScript SDK with text-davinci-003 model and configurable parameters including temperature, max tokens, and frequency penalties. The client-side implementation provides immediate responses without server latency. User-supplied API keys are configured via Account settings.",
      "Stripe SDK v12.4 handles payment processing supporting monthly and annual billing. Authentication implements JWT tokens for stateless session management. Context API manages global authentication state using useReducer pattern. LocalStorage integration enables session persistence across browser refreshes.",
      "State management uses React's built-in hooks with useState for local component state and useContext for cross-component data access. The useReducer pattern in AuthContext provides centralized authentication logic. Multiple useEffect hooks organize side effects including API calls and data fetching.",
    ],
    images: getProjectImages("ga", Array(15).fill("0")),
    client: "Hactric Solutions",
    role: "Full-Stack Developer",
    year: "2023",
    services: ["Web Development", "Web Design", "Database Setup"],
    techStack: [
      "React 18.2",
      "Express.js",
      "MongoDB",
      "Node.js",
      "OpenAI API",
      "Stripe",
      "JWT",
      "TinyMCE",
      "Tailwind CSS",
      "Material-UI",
    ],
    githubLink: "https://github.com/AW-2021/GPT-Assist",
  },
  {
    id: 3,
    title: "CV Builder",
    overview:
      "Helps users create resumes quickly with the help of a pre-made template",
    tag: "Web Dev",
    description: [
      // GENERAL INFO
      "CV Builder is a web-based resume creator that allows users to build, edit, and download professional CVs in PDF format. The application provides an intuitive interface for personal information, professional experience, education, and career summary. The live preview shows exactly how the CV will look when printed.",
      "Users enter full name, job title, contact details, and location. The Summary section allows professional overview of background and objectives. Education section supports multiple qualifications with institution names, degrees, grades, and achievement bullet points. Experience section documents jobs with company details, roles, and key responsibilities.",
      "The instant PDF generation feature downloads formatted CVs at any time. An Edit/Submit toggle controls editing mode or preview. This solves creating professionally formatted resumes without expensive software. The A4-sized form ensures proper formatting when printed or saved.",

      // TECHNICAL IMPLEMENTATION
      "Built with React 19.1.0 using functional components and hooks. Tailwind CSS 3.4.17 handles styling. PDF generation uses @react-pdf/renderer with React components for PDF creation. The CVPDF component reconstructs CV structure using Document, Page, View, Text, and tables.",
      "Component architecture uses App.jsx managing state with useState hooks. State manages disabled mode control, personal inputs, educations array, and experiences array. Dedicated components handle each CV section: PersonalInfo, Summary, EducationSection, ExperienceSection, Education, and Experience.",
    ],
    images: getProjectImages("cv", ["0", "0"]),
    role: "Front-End Developer",
    year: "2025",
    services: ["Front-End Web Development", "Web Design"],
    techStack: [
      "React 19",
      "Tailwind CSS",
      "@react-pdf/renderer",
      "JavaScript",
    ],
    githubLink: "https://github.com/AW-2021/CV-Application",
    liveLink: "https://cv-builder-blush-one.vercel.app/",
  },
  {
    id: 4,
    title: "Pokédex",
    overview:
      "Search engine and online encyclopedia of characters from the popular media franchise of Pokémon",
    tag: "Web Dev",
    description: [
      // GENERAL INFO
      "Pokédex is a full-stack web application serving as an interactive Pokémon encyclopedia and game platform. Features two main experiences: a Pokédex search app in your browser and a memory card game. Users search over 1,000 Pokémon by name or ID, viewing height, weight, base stats, & animated sprites.",
      "The memory card game challenges players to remember card positions across 11 Pokémon types: Fire, Water, Grass, Dragon, Fairy, Psychic, Fighting, Metal, Darkness, Lightning, and Colorless. Players earn points for correct matches while cards reshuffle after each selection. Fully responsive across desktop, tablet, and mobile devices.",
      "For Pokémon enthusiasts and collectors, this solves quickly accessing detailed statistics and TCG card information in one platform. Users browse Pokémon data in a nostalgic Pokédex device interface while improving memory skills. Serves as both a reference tool and entertainment application.",

      // TECHNICAL IMPLEMENTATION
      "Monorepo structure with decoupled frontend and backend deployed on Render. Express.js backend serves as API proxy abstracting the Pokémon TCG API. Backend runs a single route accepting card type parameters and fetching filtered TCG cards using secure API keys in environment variables.",
      "Backend built with Express.js 5.1.0, Node.js Fetch API, and TypeScript. CORS middleware enables cross-origin requests with proper HTTP status codes. Environment-based configuration uses dotenv. Both frontend and backend deploy on Render with automatic HTTPS.",
      "React 19 frontend uses component-driven architecture with React Router v7 for navigation between HomePage and CardGamePage. State management uses useState hooks with lifting state to parent components. Tailwind CSS v4 has been used for styling and TypeScript for custom type definitions & enhanced type safety.",
      "Card game uses shuffle algorithm with Set data structures preventing duplicate cards in reshuffles. Application tracks clicked cards to prevent replay and calculates scores dynamically with high score persistence.",
      "External API integration includes PokéAPI (free, no auth) from frontend for 1,025 Pokémon data, and Pokémon TCG API (requires auth) proxied through backend. Both APIs return paginated responses with app slicing to first 24 cards.",
      "Pokédex implements search with validation, directional navigation of Pokémon with wraparound, error handling and loading states. The loading states show an animated Pikachu sprite.",

      // UI/UX DESIGN CONSIDERATIONS
      "In terms of UI, the home page uses nostalgic video game elements, such as the pixelated background and red Pokédex device, matching the aesthetic of the Pokémon games. The card game page uses dark blue gaming interface optimized for card visibility.The useScreenSize hook tracks viewport changes to adapt the app's interface",
      // ":small screens show icon navigation, medium screens show simplified images, large screens show full navigation."
    ],
    images: getProjectImages("pd", ["0", "0", "0", "1", "2"]),
    role: "Full-Stack Developer",
    year: "2025",
    services: [
      "Web Development",
      "Web Design",
      "Backend Server Setup",
      "API Integration",
    ],
    techStack: [
      "React 19",
      "Express.js",
      "TypeScript",
      "Tailwind CSS v4",
      "React Router v7",
      "PokéAPI",
      "Pokémon TCG API",
    ],
    githubLink: "https://github.com/AW-2021/Pokedex",
    liveLink: "https://pokedex-633e.onrender.com/",
  },
  {
    id: 5,
    title: "E-commerce Website",
    overview:
      "E-commerce website with an admin dashboard for selling jewellery online",
    tag: "Branding",
    description: [
      // GENERAL INFO
      "Platonic Club is a full-stack e-commerce platform for a handmade jewelry business featuring customer storefront and comprehensive admin dashboard. Users browse curated collections, filter products by color and category, manage shopping cart and wishlist, and place standard or custom jewelry orders with reference image uploads.",
      "The homepage showcases featured collections with navigation to earrings and necklaces, displaying latest products and social links. Shop All Products page presents inventory with color and category filtering. Each product has quick view directing to detailed pages with color, material, and descriptions.",
      "Search functionality finds products by name, color, or category. Shopping cart displays items with grand total, supporting quantity updates, individual removal, and bulk clearing. Checkout includes an order form with credit card payment processing. Custom orders allow users to upload a reference image for personalized jewelry creation.",

      // ADMIN DASHBOARD
      "Admin dashboard provides complete CRUD functionality for business operations. Overview displays analytics including completed payments, pending payments, orders placed, inventory count, registered users, and customer messages. Custom order management shows submissions with reference images for design review.",
      "Placed orders section displays details with status updates, marking orders completed when shipped or paid. Inventory management allows adding new products, updating existing listings with images and specifications, or deleting items. User accounts section shows registered users with administrator privileges to remove accounts.",

      // TECHNICAL IMPLEMENTATION
      "Built with HTML, CSS, and vanilla JavaScript for semantic structure, responsive styling, and client-side interactivity. Frontend implements dynamic filtering, real-time cart updates, and interactive galleries without framework dependencies.",
      "PHP backend handles authentication, session management, database operations, and business logic. RESTful patterns organize functionality across files for product operations, cart management, order processing, and admin CRUD. File uploads process customer reference images for custom orders.",
      "MySQL relational database stores normalized tables including users, products, orders, cart items, wishlist, and messages. Foreign key constraints maintain referential integrity. Schema supports role-based access control distinguishing customers and administrators.",
      "Authentication implements secure login and registration with PHP sessions and password hashing. Role-based routing directs administrators to dashboard, customers to storefront. Prepared statements prevent SQL injection. Server-side validation complements client-side checks with proper error handling and file upload restrictions.",
    ],
    images: getProjectImages("ew", [
      "0",
      "1",
      "2",
      "0",
      "0",
      "1",
      "2",
      "0",
      "0",
      "1",
      "2",
      ...Array(6).fill("0"),
    ]),
    client: "Platonic Club",
    role: "Full-Stack Developer",
    year: "2022",
    services: ["Web Development", "Web Design", "Database Setup"],
    techStack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    githubLink: "https://github.com/AW-2021/PlatonicClub-website",
  },
];
