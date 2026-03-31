-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('DEVELOPER', 'BUYER');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "type" "OrganizationType" NOT NULL DEFAULT 'DEVELOPER';
