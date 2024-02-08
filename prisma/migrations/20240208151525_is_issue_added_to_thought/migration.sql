/*
  Warnings:

  - Added the required column `isIssue` to the `Thought` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thought" ADD COLUMN     "isIssue" BOOLEAN NOT NULL;
