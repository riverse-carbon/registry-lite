import { render, screen } from '@testing-library/react';
import OrganizationPage from './page';

jest.mock('@/components/organization-detail', () => ({
  OrganizationDetail: ({ id }: { id: string }) => <div>{id}</div>,
}));

describe('OrganizationPage', () => {
  it('passes the id to OrganizationDetail', async () => {
    render(await OrganizationPage({ params: Promise.resolve({ id: 'org-xyz' }) }));
    expect(screen.getByText('org-xyz')).toBeInTheDocument();
  });

  it('has a link back to the home page', async () => {
    render(await OrganizationPage({ params: Promise.resolve({ id: 'org-xyz' }) }));
    expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/');
  });
});
