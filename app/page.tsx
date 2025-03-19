'use client'
import { useState, useEffect } from 'react';
import { Project, sampleProjects } from '@/data/sampleProjects';
import Link from 'next/link';

interface Project {
  title: string;
  technology: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  learningPoints?: string[];
  hints?: string[];
}

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Ruby",
  "PHP"
];

const STACKS: Record<string, string[]> = {
  JavaScript: ["React", "Vue", "Angular", "Node.js", "Express", "Next.js", "Vanilla JS"],
  TypeScript: ["React", "Next.js", "Angular", "Node.js", "NestJS"],
  Python: ["Django", "Flask", "FastAPI", "Data Science", "Machine Learning"],
  Java: ["Spring Boot", "Android", "JavaFX", "Hibernate"],
  "C#": [".NET Core", "ASP.NET", "Blazor", "Unity", "WPF"],
  Go: ["Web Services", "CLI Applications", "Microservices"],
  Ruby: ["Ruby on Rails", "Sinatra"],
  PHP: ["Laravel", "Symfony", "WordPress"]
};

const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

export default function Home() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedStack, setSelectedStack] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [showingHints, setShowingHints] = useState<Record<string, boolean>>({});

  useEffect(() => {
    console.log('Language changed:', selectedLanguage);
    console.log('Available stacks:', selectedLanguage ? STACKS[selectedLanguage] : []);
  }, [selectedLanguage]);

  useEffect(() => {
    console.log('Stack changed:', selectedStack);
  }, [selectedStack]);

  const handleLanguageChange = (lang: string) => {
    console.log('Handling language change:', lang);
    setSelectedLanguage(lang);
    setSelectedStack("");
  };

  const generateProject = async () => {
    if (!selectedLanguage || !selectedStack) {
      setError('Please select both a language and a stack');
      return;
    }

    setLoading(true);
    setError(null);
    console.log('Generating new project...');
    
    try {
      const response = await fetch('/api/generate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          stack: selectedStack,
          difficulty: difficultyLevel,
        }),
      });
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received project data:', data);
      setProject(data);
    } catch (error) {
      console.error('Error generating project:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleHints = (projectId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowingHints(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const ProjectCard = ({ project, projectId }: { project: Project, projectId: string }) => {
    const saveAndNavigate = () => {
      localStorage.setItem(`project-${projectId}`, JSON.stringify(project));
    };

    return (
      <div
        id={`project-${projectId}`}
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl mt-12 mb-12"
      >
        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {project.difficulty}
                </span>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {project.technology}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3 text-start">{project.description}</p>
          <div className="flex justify-end">
            <Link 
              href={`/project/${projectId}`}
              onClick={saveAndNavigate}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Daily Coding Project Generator
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Select your preferred language and stack to generate customized coding projects
          </p>

          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="language" className="text-sm text-gray-600 text-left">
                Programming Language
              </label>
              <select
                id="language"
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="block w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Language</option>
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="stack" className="text-sm text-gray-600 text-left">
                Framework/Stack
              </label>
              <select
                id="stack"
                value={selectedStack}
                onChange={(e) => setSelectedStack(e.target.value)}
                className="block w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!selectedLanguage}
              >
                <option value="">Select Stack</option>
                {selectedLanguage && STACKS[selectedLanguage]?.map(stack => (
                  <option key={stack} value={stack}>{stack}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="difficulty" className="text-sm text-gray-600 text-left">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                className="block w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Difficulty</option>
                {DIFFICULTY_LEVELS.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={generateProject}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !selectedLanguage || !selectedStack || !difficultyLevel}
          >
            {loading ? 'Generating...' : 'Generate Project'}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              Error: {error}
            </div>
          )}

          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Generating your project...</p>
            </div>
          )}

          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Generated Project */}
              {project && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Your Generated Project
                  </h2>
                  <ProjectCard project={project} projectId="generated" />
                </div>
              )}

              {/* Sample Projects */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Example Projects for Inspiration
                </h2>
                {sampleProjects.map((project, index) => (
                  <ProjectCard 
                    key={index} 
                    project={project} 
                    projectId={`sample-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
