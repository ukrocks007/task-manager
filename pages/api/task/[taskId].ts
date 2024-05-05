import { validateOrThrow, updateTaskSchema } from "@/lib/zod";
import { getById, remove, update } from "@/models/Task";
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
      case "PUT":
        await handlePut(req, res);
        break;
      case "DELETE":
        await handleDelete(req, res);
        break;
      default:
        res.status(405).end();
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ data: await getById(req.query.taskId as string) });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const data = validateOrThrow(updateTaskSchema, {
    ...req.body,
    ...req.query,
  });
  res.status(200).json({ data: await update(data) });
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  await remove(req.query.taskId as string);
  res.status(200).json({ data: "Task deleted" });
}
