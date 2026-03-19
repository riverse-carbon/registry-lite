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

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      organizationId
    }
  }
`;

type Project = {
  id: string;
  name: string;
  organizationId: string;
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
        <TableHeadCell>Organization ID</TableHeadCell>
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
              {project.name}
            </TableCell>
            <TableCell className="font-mono text-xs text-gray-500 dark:text-gray-400">
              {project.organizationId}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
