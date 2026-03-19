import { render, screen } from '@testing-library/react';
import OrganizationPage from './page';

describe('OrganizationPage', () => {
  it('displays the organization id', async () => {
    render(await OrganizationPage({ params: Promise.resolve({ id: 'org-xyz' }) }));
    expect(screen.getByText('org-xyz')).toBeInTheDocument();
  });

  it('has a link back to the home page', async () => {
    render(await OrganizationPage({ params: Promise.resolve({ id: 'org-xyz' }) }));
    expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/');
  });
});
