import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Organization } from '../organization/organization.model';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ID)
  organizationId: string;

  @Field(() => Organization, { nullable: true })
  organization?: Organization | null;
}
