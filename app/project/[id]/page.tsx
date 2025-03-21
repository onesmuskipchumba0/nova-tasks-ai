'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Project } from '@/data/sampleProjects';
import Link from 'next/link';

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = () => {
      setLoading(true);
      const projectData = localStorage.getItem(`project-${params.id}`);
      if (projectData) {
        setProject(JSON.parse(projectData));
      }
      setLoading(false);
    };

    fetchProject();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Projects
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <h1 className="text-3xl font-bold text-white">{project.title}</h1>
            <div className="flex gap-4 mt-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-white">
                {project.technology}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-white">
                {project.difficulty}
              </span>
            </div>
          </div>

          <div className="p-6">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700">{project.description}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Learning Points</h2>
              <ul className="list-disc pl-5 space-y-2">
                {project.learningPoints?.map((point, index) => (
                  <li key={index} className="text-gray-700">{point}</li>
                ))}
              </ul>
            </section>

            {project.hints && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Implementation Hints</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {project.hints.map((hint, index) => (
                    <li key={index} className="text-gray-700">{hint}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.prerequisites && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {project.prerequisites.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
