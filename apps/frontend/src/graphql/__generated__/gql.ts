/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetOrganization($id: ID!) {\n  organization(id: $id) {\n    id\n    name\n    projects {\n      id\n      name\n    }\n  }\n}\n\nmutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    name\n    organizationId\n  }\n}": typeof types.GetOrganizationDocument,
    "query GetProjects {\n  projects {\n    id\n    name\n    organization {\n      id\n      name\n    }\n  }\n}": typeof types.GetProjectsDocument,
};
const documents: Documents = {
    "query GetOrganization($id: ID!) {\n  organization(id: $id) {\n    id\n    name\n    projects {\n      id\n      name\n    }\n  }\n}\n\nmutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    name\n    organizationId\n  }\n}": types.GetOrganizationDocument,
    "query GetProjects {\n  projects {\n    id\n    name\n    organization {\n      id\n      name\n    }\n  }\n}": types.GetProjectsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOrganization($id: ID!) {\n  organization(id: $id) {\n    id\n    name\n    projects {\n      id\n      name\n    }\n  }\n}\n\nmutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    name\n    organizationId\n  }\n}"): (typeof documents)["query GetOrganization($id: ID!) {\n  organization(id: $id) {\n    id\n    name\n    projects {\n      id\n      name\n    }\n  }\n}\n\nmutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    name\n    organizationId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProjects {\n  projects {\n    id\n    name\n    organization {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query GetProjects {\n  projects {\n    id\n    name\n    organization {\n      id\n      name\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;