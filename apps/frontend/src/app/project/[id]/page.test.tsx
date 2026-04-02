import { render, screen } from '@testing-library/react';
import ProjectPage from './page';

describe('ProjectPage', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('loads project details from GraphQL and displays the name', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          project: {
            id: 'abc-123',
            name: 'Forest Restoration',
            organization: { id: 'org-1', name: 'Acme Corp' },
          },
        },
      }),
    });

    render(await ProjectPage({ params: Promise.resolve({ id: 'abc-123' }) }));

    expect(await screen.findByRole('heading', { name: 'Forest Restoration' })).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('abc-123'),
      }),
    );
  });

  it('shows a not-found message when the project does not exist', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: { project: null } }),
    });

    render(await ProjectPage({ params: Promise.resolve({ id: 'missing' }) }));

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });

  it('has a link back to the home page', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          project: {
            id: 'abc-123',
            name: 'Forest Restoration',
            organization: null,
          },
        },
      }),
    });

    render(await ProjectPage({ params: Promise.resolve({ id: 'abc-123' }) }));

    expect(await screen.findByRole('heading', { name: 'Forest Restoration' }));
    expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/');
  });
});
