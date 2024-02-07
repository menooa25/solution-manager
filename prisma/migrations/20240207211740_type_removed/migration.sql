/*
  Warnings:

  - You are about to drop the column `feel` on the `Thought` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Thought` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Thought" DROP COLUMN "feel",
DROP COLUMN "type",
ADD COLUMN     "feelGood" BOOLEAN NOT NULL DEFAULT true;
