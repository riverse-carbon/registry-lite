import Link from 'next/link';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to projects
        </Link>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-purple-600 dark:text-purple-400">
            Project
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">{id}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Detailed information about this project is coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}
