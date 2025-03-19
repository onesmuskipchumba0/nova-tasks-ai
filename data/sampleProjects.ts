export interface Project {
  title: string;
  technology: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  learningPoints: string[];
  hints?: string[];
}

export const sampleProjects: Project[] = [
  {
    title: "Weather Dashboard",
    technology: "React",
    difficulty: "beginner",
    description: "Create a weather dashboard that displays current weather and 5-day forecast using a weather API.",
    learningPoints: [
      "API Integration",
      "State Management",
      "Async/Await",
      "Component Design"
    ],
    hints: [
      "Use OpenWeather API",
      "Consider using React Query for data fetching",
      "Implement error handling for API calls"
    ]
  },
  {
    title: "Task Management API",
    technology: "Node.js",
    difficulty: "intermediate",
    description: "Build a RESTful API for managing tasks with authentication and database integration.",
    learningPoints: [
      "REST API Design",
      "Authentication",
      "Database Operations",
      "Middleware Usage"
    ],
    hints: [
      "Use JWT for authentication",
      "Implement proper error handling middleware",
      "Add input validation"
    ]
  },
  {
    title: "Real-time Chat Application",
    technology: "Next.js",
    difficulty: "advanced",
    description: "Develop a real-time chat application with private rooms and file sharing capabilities.",
    learningPoints: [
      "WebSocket Integration",
      "Real-time Updates",
      "File Handling",
      "User Authentication"
    ],
    hints: [
      "Consider using Socket.io",
      "Implement message encryption",
      "Use proper WebSocket error handling"
    ]
  }
];
