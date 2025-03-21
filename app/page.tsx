'use client'
import { useState } from 'react';

interface Project {
  title: string;
  technology: string;
  difficulty: string;
  description: string;
  learningPoints?: string[];
}

export default function Home() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateProject = async () => {
    setLoading(true);
    setError(null);
    console.log('Generating new project...');
    
    try {
      const response = await fetch('/api/generate-project');
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
            Generate fun and educational coding projects across different languages and frameworks.
            Perfect for daily practice and skill improvement.
          </p>
          
          <button
            onClick={generateProject}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate New Project'}
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
