import { Task } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export const getByUserId = async (userId: string): Promise<Task[]> => {
  return prisma.task.findMany({
    where: {
      userId,
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


