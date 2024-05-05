import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};
