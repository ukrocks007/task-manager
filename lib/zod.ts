import zod from "zod";
import { ZodSchema } from "zod";

export const createTaskSchema = zod.object({
  userId: zod
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    })
    .min(1, "User ID is required")
    .max(36, "User ID is too long"),
  title: zod
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title is required")
    .max(255, "Title is too long"),
  description: zod
    .string({
      invalid_type_error: "Description must be a string",
    })
    .max(255, "Description is too long")
    .or(zod.literal("")),
});

export const updateTaskSchema = zod.object({
  id: zod
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .min(1, "ID is required")
    .max(36, "ID is too long"),
  title: zod
    .string({
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title is required")
    .max(255, "Title is too long")
    .optional(),
  description: zod
    .string({
      invalid_type_error: "Description must be a string",
    })
    .max(255, "Description is too long")
    .or(zod.literal(""))
    .optional(),
  status: zod.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

export const validateOrThrow = (schema: ZodSchema, data: any): any => {
  const validatedData = schema.safeParse(data);
  if (!validatedData.success) {
    throw new Error(validatedData.error.errors[0].message);
  }
  return validatedData.data;
};
