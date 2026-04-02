import { print } from 'graphql';
import Link from 'next/link';
import { GetProjectDocument } from '@/graphql/__generated__/graphql';

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3001/graphql';

async function loadProject(id: string) {
  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(GetProjectDocument),
      variables: { id },
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const json = (await response.json()) as {
    data?: {
      project?: {
        id: string;
        name: string;
        organization?: { id: string; name: string } | null;
      } | null;
    };
    errors?: ReadonlyArray<{ message?: string }>;
  };

  if (json.errors?.length) {
    const message = json.errors.map((e) => e.message ?? 'Unknown error').join(', ');
    throw new Error(message);
  }

  return json.data?.project ?? null;
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await loadProject(id);

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
          {!project ? (
            <>
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
                Project not found
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                No project exists with id{' '}
                <span className="font-mono text-gray-700 dark:text-gray-300">{id}</span>.
              </p>
            </>
          ) : (
            <>
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
                {project.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Organization:{' '}
                {project.organization ? (
                  <Link
                    href={`/organization/${project.organization.id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {project.organization.name}
                  </Link>
                ) : (
                  <span className="text-gray-600 dark:text-gray-300">—</span>
                )}
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
