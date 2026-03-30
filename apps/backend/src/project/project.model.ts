import type { Organization } from '../organization/organization.model';

export type Project = {
  id: string;
  name: string;
  organizationId: string;
  organization?: Organization | null;
};
