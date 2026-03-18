import { Badge, Button, Card, Navbar, NavbarBrand } from 'flowbite-react';
import { HiArrowRight, HiCube, HiLockClosed, HiSearch } from 'react-icons/hi';
import { ProjectsTable } from '@/components/projects-table';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar fluid>
        <NavbarBrand href="/">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Rainbow Lite Registry
          </span>
        </NavbarBrand>
      </Navbar>

      <main>
        <section className="py-24 px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <Badge color="purple" className="mb-6 inline-flex">
              Open Registry
            </Badge>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Welcome to the{' '}
              <span className="text-purple-600 dark:text-purple-400">Rainbow Lite Registry</span>
            </h1>
            <p className="mb-10 text-xl text-gray-500 dark:text-gray-400">
              A fast, lightweight registry for discovering, publishing, and managing packages.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button color="purple" size="lg" href="#">
                Browse Packages
                <HiArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button color="light" size="lg" href="#">
                Publish a Package
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Projects
            </h2>
            <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
              All projects registered in the registry.
            </p>
            <ProjectsTable />
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Everything you need in a registry
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <Card>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-purple-100 p-4 dark:bg-purple-900">
                    <HiSearch className="h-7 w-7 text-purple-600 dark:text-purple-300" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    Discover
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Search and explore thousands of packages with ease.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-blue-100 p-4 dark:bg-blue-900">
                    <HiCube className="h-7 w-7 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    Publish
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Share your packages with the community in seconds.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-4 dark:bg-green-900">
                    <HiLockClosed className="h-7 w-7 text-green-600 dark:text-green-300" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    Secure
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Built-in security scanning and access control for every package.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
