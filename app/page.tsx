'use client'
import { useState, useEffect } from 'react';

interface Project {
  title: string;
  technology: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  learningPoints?: string[];
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

          {project && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg text-left">
              <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
              <div className="mb-4">
                <span className="font-semibold">Technology:</span> {project.technology}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Difficulty:</span> {project.difficulty}
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Description:</h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Key Learning Points:</h3>
                <ul className="list-disc pl-5">
                  {project.learningPoints?.map((point, index) => (
                    <li key={index} className="text-gray-700">{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
