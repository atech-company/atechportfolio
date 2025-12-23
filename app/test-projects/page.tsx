import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TestProjectsPage() {
  const projects = await db.getProjects();
  
  return (
    <div className="min-h-screen bg-dark-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Test Projects Page</h1>
      <div className="text-white">
        <p>Total projects: {projects.length}</p>
        <pre className="bg-dark-800 p-4 rounded mt-4 overflow-auto">
          {JSON.stringify(projects, null, 2)}
        </pre>
      </div>
    </div>
  );
}

