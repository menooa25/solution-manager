"use server";
import { getUserId } from "@/app/lib/actions";
import prisma from "@/prisma/db";
import { Thought } from "@prisma/client";
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
export const createRelatedThought = async (
  id: number,
  isIssue: boolean,
  description: string,
  feelGood: boolean,
  relatedType: "solution" | "issue"
) => {
  const userId = await getUserId();
  if (!userId) return null;
  let related = await prisma.thought.create({
    data: {
      description,
      isIssue,
      feelGood,
      userId,
    },
  });
  if (relatedType === "issue") {
    await prisma.thought.update({
      where: { id },
      data: {
        issues: {
          connect: related,
        },
      },
    });
  } else
    await prisma.thought.update({
      where: { id },
      data: {
        solutions: {
          connect: related,
        },
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
