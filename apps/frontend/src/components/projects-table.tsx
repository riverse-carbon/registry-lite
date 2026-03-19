'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import Link from 'next/link';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      organization {
        id
        name
      }
    }
  }
`;

type Project = {
  id: string;
  name: string;
  organization: { id: string; name: string } | null;
};

type GetProjectsData = {
  projects: Project[];
};

export function ProjectsTable() {
  const { data, loading, error } = useQuery<GetProjectsData>(GET_PROJECTS);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-8 text-center text-red-500 dark:text-red-400">
        Failed to load projects: {error.message}
      </p>
    );
  }

  return (
    <Table hoverable>
      <TableHead>
        <TableHeadCell>Project</TableHeadCell>
        <TableHeadCell>Organization</TableHeadCell>
      </TableHead>
      <TableBody className="divide-y">
        {data?.projects.length === 0 && (
          <TableRow>
            <TableCell colSpan={2} className="py-8 text-center text-gray-500 dark:text-gray-400">
              No projects found.
            </TableCell>
          </TableRow>
        )}
        {data?.projects.map((project) => (
          <TableRow key={project.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="font-medium text-gray-900 dark:text-white">
              <Link
                href={`/project/${project.id}`}
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                {project.name}
              </Link>
            </TableCell>
            <TableCell className="text-gray-700 dark:text-gray-300">
              {project.organization ? (
                <Link
                  href={`/organization/${project.organization.id}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {project.organization.name}
                </Link>
              ) : (
                '—'
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
