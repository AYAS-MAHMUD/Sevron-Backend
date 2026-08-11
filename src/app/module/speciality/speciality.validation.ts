
import z from "zod"


export const createSpecialtySchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters")
      .trim(),

    description: z
      .string()
      .max(5000, "Description cannot exceed 5000 characters")
      .trim()
      .optional(),

    icon: z
      .string()
      .max(255, "Icon cannot exceed 255 characters")
      .trim()
      .optional(),
  }),
});


export const updateSpecialtySchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .max(100, "Title cannot exceed 100 characters")
      .trim()
      .optional(),

    description: z
      .string()
      .max(5000, "Description cannot exceed 5000 characters")
      .trim()
      .optional(),

    icon: z
      .string()
      .max(255, "Icon cannot exceed 255 characters")
      .trim()
      .optional(),
  }),

  params: z.object({
    id: z.string().uuid("Invalid specialty ID"),
  }),
});