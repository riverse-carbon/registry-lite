import { useQuery } from '@apollo/client/react';
import { render, screen } from '@testing-library/react';
import { OrganizationDetail } from './organization-detail';

jest.mock('@apollo/client', () => ({ gql: (s: TemplateStringsArray) => s.join('') }));
jest.mock('@apollo/client/react', () => ({ useQuery: jest.fn() }));

// Apollo 4's useQuery return type is too complex to satisfy with a plain object literal;
// casting via unknown lets us supply only the fields the component actually uses.
const mockUseQuery = useQuery as unknown as jest.Mock;

const ORG = {
  id: 'org-1',
  name: 'Green Corp',
  projects: [
    { id: 'proj-1', name: 'Solar Farm Alpha' },
    { id: 'proj-2', name: 'Wind Energy Beta' },
  ],
};

describe('OrganizationDetail', () => {
  it('shows the organization name', () => {
    mockUseQuery.mockReturnValue({ data: { organization: ORG }, loading: false });

    render(<OrganizationDetail id="org-1" />);

    expect(screen.getByText('Green Corp')).toBeInTheDocument();
  });

  it('lists each project with a link to its detail page', () => {
    mockUseQuery.mockReturnValue({ data: { organization: ORG }, loading: false });

    render(<OrganizationDetail id="org-1" />);

    const link = screen.getByRole('link', { name: 'Solar Farm Alpha' });
    expect(link).toHaveAttribute('href', '/project/proj-1');

    const link2 = screen.getByRole('link', { name: 'Wind Energy Beta' });
    expect(link2).toHaveAttribute('href', '/project/proj-2');
  });

  it('shows a placeholder when the organization has no projects', () => {
    mockUseQuery.mockReturnValue({
      data: { organization: { ...ORG, projects: [] } },
      loading: false,
    });

    render(<OrganizationDetail id="org-1" />);

    expect(screen.getByText(/no projects/i)).toBeInTheDocument();
  });

  it('shows a spinner while loading', () => {
    mockUseQuery.mockReturnValue({ data: undefined, loading: true });

    render(<OrganizationDetail id="org-1" />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error message on failure', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error('Network error'),
    });

    render(<OrganizationDetail id="org-1" />);

    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });
});
