'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';

const GET_ORGANIZATION = gql`
  query GetOrganization($id: ID!) {
    organization(id: $id) {
      id
      name
      projects {
        id
        name
      }
    }
  }
`;

type OrganizationData = {
  organization: {
    id: string;
    name: string;
    projects: { id: string; name: string }[];
  } | null;
};

export function OrganizationDetail({ id }: { id: string }) {
  const { data, loading, error } = useQuery<OrganizationData>(GET_ORGANIZATION, {
    variables: { id },
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div
          role="status"
          className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
        />
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-8 text-center text-red-500 dark:text-red-400">
        Failed to load organization: {error.message}
      </p>
    );
  }

  const org = data?.organization;

  if (!org) {
    return (
      <p className="py-8 text-center text-gray-500 dark:text-gray-400">Organization not found.</p>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="p-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Organization
        </p>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{org.name}</h1>
      </div>

      <div className="border-t border-gray-200 px-8 py-6 dark:border-gray-700">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Projects</h2>
        {org.projects.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No projects found.</p>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {org.projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/project/${project.id}`}
                  className="flex items-center justify-between py-3 text-gray-900 hover:text-purple-600 dark:text-gray-100 dark:hover:text-purple-400"
                >
                  {project.name}
                  <span className="text-gray-400" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
