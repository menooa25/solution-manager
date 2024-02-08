"use server";
import { getUserId } from "@/app/lib/actions";
import prisma from "@/prisma/db";
import { Sql } from "@prisma/client/runtime/library";

export const createThought = async (
  isIssue: boolean,
  description: string,
  feelGood: boolean
) => {
  const userId = await getUserId();
  if (!userId) return null;
  await prisma.thought.create({
    data: {
      isIssue,
      description,
      feelGood,
      userId,
    },
  });
};

export const getIssuesWithSolution = async () => {
  const userId = await getUserId();
  if (!userId) return null;
  const issues = await prisma.thought.findMany({
    where: { userId },
    include: {
      solutions: { select: { id: true } },
      issues: { select: { id: true } },
    },
  });
  return issues;
};

export const getAllRelatedThoughts = async (id: number) => {
  // Define a recursive function to traverse through related thoughts
  return await prisma.thought.findUnique({
    where: { id },
    include: {
      issues: {
        include: {
          solutions: {
            where: { NOT: { id } },
          },
          issues: true,
        },
      },
      solutions: {
        include: {
          issues: {
            where: { NOT: { id } },
          },
          solutions: true,
        },
      },
    },
  });
};
