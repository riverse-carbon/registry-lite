import { useQuery } from '@apollo/client/react';
import { render, screen } from '@testing-library/react';
import { ProjectsTable } from './projects-table';

jest.mock('@apollo/client', () => ({ gql: (s: TemplateStringsArray) => s.join('') }));
jest.mock('@apollo/client/react', () => ({ useQuery: jest.fn() }));
jest.mock('flowbite-react', () => ({
  Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
  TableHead: ({ children }: { children: React.ReactNode }) => (
    <thead>
      <tr>{children}</tr>
    </thead>
  ),
  TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
  TableRow: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
  TableCell: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
  TableHeadCell: ({ children }: { children: React.ReactNode }) => <th>{children}</th>,
  Spinner: () => <div role="status">Loading...</div>,
}));

// Apollo 4's useQuery return type is too complex to satisfy with a plain object literal;
// casting via unknown lets us supply only the fields the component actually uses.
const mockUseQuery = useQuery as unknown as jest.Mock;

const PROJECTS = [
  {
    id: 'proj-1',
    name: 'Solar Farm Alpha',
    organization: { id: 'org-1', name: 'Green Corp' },
  },
  {
    id: 'proj-2',
    name: 'Wind Energy Beta',
    organization: null,
  },
];

describe('ProjectsTable', () => {
  it('renders a link to /project/:id for each project name', () => {
    mockUseQuery.mockReturnValue({
      data: { projects: PROJECTS },
      loading: false,
      error: undefined,
    });

    render(<ProjectsTable />);

    const link = screen.getByRole('link', { name: 'Solar Farm Alpha' });
    expect(link).toHaveAttribute('href', '/project/proj-1');
  });

  it('renders a link to /organization/:id for each organization name', () => {
    mockUseQuery.mockReturnValue({
      data: { projects: PROJECTS },
      loading: false,
      error: undefined,
    });

    render(<ProjectsTable />);

    const link = screen.getByRole('link', { name: 'Green Corp' });
    expect(link).toHaveAttribute('href', '/organization/org-1');
  });

  it('shows an em-dash when the organization is null', () => {
    mockUseQuery.mockReturnValue({
      data: { projects: PROJECTS },
      loading: false,
      error: undefined,
    });

    render(<ProjectsTable />);

    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('shows a spinner while loading', () => {
    mockUseQuery.mockReturnValue({ data: undefined, loading: true, error: undefined });

    render(<ProjectsTable />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error message on failure', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error('Network error'),
    });

    render(<ProjectsTable />);

    expect(screen.getByText(/Failed to load projects/)).toBeInTheDocument();
  });
});
