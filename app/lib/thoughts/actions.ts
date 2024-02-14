"use server";
import { getUserId } from "@/app/lib/actions";
import prisma from "@/prisma/db";
import { Thought } from "@prisma/client";

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
  relatedType: "solution" | "issue",
  relatedId?: number
) => {
  const userId = await getUserId();
  if (!userId) return null;
  let related: Thought | null = null;
  if (relatedId)
    related = await prisma.thought.findUnique({
      where: {
        id: relatedId,
      },
    });
  else if (!relatedId && related === null)
    related = await prisma.thought.create({
      data: {
        description,
        isIssue,
        feelGood,
        userId,
      },
    });

  if (relatedType === "issue") {
    await prisma.thought.update({
      where: { id, userId },
      data: {
        issues: {
          connect: related!,
        },
      },
    });
  } else
    await prisma.thought.update({
      where: { id, userId },
      data: {
        solutions: {
          connect: related!,
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
  const userId = await getUserId();
  if (!userId) return [];
  return await prisma.thought.findUnique({
    where: { id, userId },
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

export const deleteThought = async (id: number) => {
  const userId = await getUserId();
  if (!userId) return [];
  return await prisma.thought.delete({
    where: { id, userId },
  });
};

export const findThoughts = async (description: string) => {
  const userId = await getUserId();
  if (!userId) return [];
  return await prisma.thought.findMany({
    where: {
      userId,
      description: {
        contains: description,
      },
    },
  });
};

export const renameThought = async (id: number, description: string) => {
  const userId = await getUserId();
  if (!userId) return null;
  return await prisma.thought.update({
    where: { id, userId },
    data: { description },
  });
};
