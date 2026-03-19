import { render, screen } from '@testing-library/react';
import ProjectPage from './page';

describe('ProjectPage', () => {
  it('displays the project id', async () => {
    render(await ProjectPage({ params: Promise.resolve({ id: 'abc-123' }) }));
    expect(screen.getByText('abc-123')).toBeInTheDocument();
  });

  it('has a link back to the home page', async () => {
    render(await ProjectPage({ params: Promise.resolve({ id: 'abc-123' }) }));
    expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/');
  });
});
