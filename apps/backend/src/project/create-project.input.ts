import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field(() => ID)
  organizationId: string;
}
