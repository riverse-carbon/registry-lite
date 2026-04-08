import { render, screen } from '@testing-library/react';
import { query } from '@/lib/apollo-rsc';
import ProjectPage from './page';

jest.mock('@/lib/apollo-rsc', () => ({
  query: jest.fn(),
}));

const mockQuery = query as jest.MockedFunction<typeof query>;

describe('ProjectPage', () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });

  it('loads project details from GraphQL and displays the name', async () => {
    mockQuery.mockResolvedValue({
      data: {
        project: {
          id: 'abc-123',
          name: 'Forest Restoration',
          organization: { id: 'org-1', name: 'Acme Corp' },
        },
      },
    });

    render(await ProjectPage({ params: Promise.resolve({ id: 'abc-123' }) }));

    expect(await screen.findByRole('heading', { name: 'Forest Restoration' })).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { id: 'abc-123' },
      }),
    );
  });

  it('shows a not-found message when the project does not exist', async () => {
    mockQuery.mockResolvedValue({ data: { project: null } });

    render(await ProjectPage({ params: Promise.resolve({ id: 'missing' }) }));

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });

  it('has a link back to the home page', async () => {
    mockQuery.mockResolvedValue({
      data: {
        project: {
          id: 'abc-123',
          name: 'Forest Restoration',
          organization: null,
        },
      },
    });

    render(await ProjectPage({ params: Promise.resolve({ id: 'abc-123' }) }));

    expect(await screen.findByRole('heading', { name: 'Forest Restoration' }));
    expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/');
  });
});
