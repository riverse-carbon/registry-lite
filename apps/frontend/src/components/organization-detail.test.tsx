import { useMutation, useQuery } from '@apollo/client/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrganizationDetail } from './organization-detail';

jest.mock('@apollo/client', () => ({ gql: (s: TemplateStringsArray) => s.join('') }));
jest.mock('@apollo/client/react', () => ({ useQuery: jest.fn(), useMutation: jest.fn() }));
jest.mock('flowbite-react', () => ({
  Modal: ({ show, children }: { show: boolean; children: React.ReactNode; onClose: () => void }) =>
    show ? <div role="dialog">{children}</div> : null,
  ModalHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ModalBody: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ModalFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({
    children,
    onClick,
    type,
    disabled,
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  Label: ({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) => (
    <label htmlFor={htmlFor}>{children}</label>
  ),
  TextInput: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
}));

// Apollo 4's hook return types are complex; cast via unknown to supply only the fields used.
const mockUseQuery = useQuery as unknown as jest.Mock;
const mockUseMutation = useMutation as unknown as jest.Mock;

const ORG = {
  id: 'org-1',
  name: 'Green Corp',
  projects: [
    { id: 'proj-1', name: 'Solar Farm Alpha' },
    { id: 'proj-2', name: 'Wind Energy Beta' },
  ],
};

let mockRefetch: jest.Mock;
let mockCreate: jest.Mock;

beforeEach(() => {
  mockRefetch = jest.fn();
  mockCreate = jest.fn().mockResolvedValue({});
  mockUseQuery.mockReturnValue({
    data: { organization: ORG },
    loading: false,
    refetch: mockRefetch,
  });
  mockUseMutation.mockReturnValue([mockCreate, {}]);
});

describe('OrganizationDetail', () => {
  it('shows the organization name', () => {
    render(<OrganizationDetail id="org-1" />);
    expect(screen.getByText('Green Corp')).toBeInTheDocument();
  });

  it('lists each project with a link to its detail page', () => {
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
      refetch: mockRefetch,
    });

    render(<OrganizationDetail id="org-1" />);
    expect(screen.getByText(/no projects/i)).toBeInTheDocument();
  });

  it('shows a spinner while loading', () => {
    mockUseQuery.mockReturnValue({ data: undefined, loading: true, refetch: mockRefetch });
    render(<OrganizationDetail id="org-1" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error message on failure', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error('Network error'),
      refetch: mockRefetch,
    });
    render(<OrganizationDetail id="org-1" />);
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  describe('Create Project dialog', () => {
    it('renders a "Create Project" button', () => {
      render(<OrganizationDetail id="org-1" />);
      expect(screen.getByRole('button', { name: /create project/i })).toBeInTheDocument();
    });

    it('opens a dialog when the button is clicked', async () => {
      const user = userEvent.setup();
      render(<OrganizationDetail id="org-1" />);

      await user.click(screen.getByRole('button', { name: /create project/i }));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('calls createProject mutation with the project name and org id on submit', async () => {
      const user = userEvent.setup();
      render(<OrganizationDetail id="org-1" />);

      await user.click(screen.getByRole('button', { name: /create project/i }));
      await user.type(screen.getByLabelText(/project name/i), 'My New Project');
      await user.click(screen.getByRole('button', { name: /^create$/i }));

      expect(mockCreate).toHaveBeenCalledWith({
        variables: { input: { name: 'My New Project', organizationId: 'org-1' } },
      });
    });

    it('closes the dialog and refetches the project list on success', async () => {
      const user = userEvent.setup();
      render(<OrganizationDetail id="org-1" />);

      await user.click(screen.getByRole('button', { name: /create project/i }));
      await user.type(screen.getByLabelText(/project name/i), 'My New Project');
      await user.click(screen.getByRole('button', { name: /^create$/i }));

      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
      expect(mockRefetch).toHaveBeenCalled();
    });

    it('shows an error and keeps the dialog open when the mutation fails', async () => {
      const user = userEvent.setup();
      mockCreate.mockRejectedValue(new Error('Something went wrong'));
      render(<OrganizationDetail id="org-1" />);

      await user.click(screen.getByRole('button', { name: /create project/i }));
      await user.type(screen.getByLabelText(/project name/i), 'Bad Project');
      await user.click(screen.getByRole('button', { name: /^create$/i }));

      await waitFor(() => expect(screen.getByText('Something went wrong')).toBeInTheDocument());
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(mockRefetch).not.toHaveBeenCalled();
    });
  });
});
