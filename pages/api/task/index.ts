import { validateOrThrow, createTaskSchema } from "@/lib/zod";
import { create, getByUserId } from "@/models/Task";
import { TaskStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        await handleGet(req, res);
        break;
      case "POST":
        await handlePost(req, res);
        break;
      default:
        res.status(405).end();
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { userId, status } = req.query;
  res
    .status(200)
    .json({
      data: await getByUserId(
        userId as string,
        status as TaskStatus | undefined
      ),
    });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const data = validateOrThrow(createTaskSchema, req.body);
  res.status(200).json({ data: await create(data) });
}
