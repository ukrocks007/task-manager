import { Task, TaskStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export const getById = async (id: string): Promise<Task | null> => {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const getByUserId = async (userId: string, status: TaskStatus | undefined): Promise<Task[]> => {
  return prisma.task.findMany({
    where: {
      userId,
      status,
    },
  });
};

export const create = async (data: {
  userId: string;
  title: string;
  description: string;
}): Promise<Task> => {
  const { userId, title, description } = data;
  return prisma.task.create({
    data: {
      id: randomUUID(),
      userId,
      title,
      description,
    },
  });
};

export const update = async (data: {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}): Promise<Task> => {
  const { id, title, description, status } = data;
  return prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      status,
    },
  });
};

export const remove = async (id: string): Promise<void> => {
  prisma.task.delete({
    where: {
      id,
    },
  });
};
