'use client';

import { useMutation, useQuery } from '@apollo/client/react';
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';
import { CreateProjectDocument, GetOrganizationDocument } from '@/graphql/__generated__/graphql';

export function OrganizationDetail({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery(GetOrganizationDocument, {
    variables: { id },
  });

  const [createProject] = useMutation(CreateProjectDocument);

  const handleOpenModal = () => {
    setCreateError(null);
    setProjectName('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProjectName('');
    setCreateError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setCreateError(null);
    try {
      await createProject({ variables: { input: { name: projectName, organizationId: id } } });
      handleCloseModal();
      void refetch();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

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
    <>
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Organization
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{org.name}</h1>
        </div>

        <div className="border-t border-gray-200 px-8 py-6 dark:border-gray-700">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h2>
            <Button size="sm" onClick={handleOpenModal}>
              Create Project
            </Button>
          </div>

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

      <Modal show={isModalOpen} onClose={handleCloseModal} size="md">
        <ModalHeader>Create Project</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            {createError && (
              <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
                {createError}
              </p>
            )}
            <div>
              <Label htmlFor="project-name">Project name</Label>
              <TextInput
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                required
                autoFocus
                className="mt-1"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creating…' : 'Create'}
            </Button>
            <Button color="gray" type="button" onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
