import { z } from 'zod';

export const CategoriesSchema = z.object({
  id: z.string().optional(),
});

export type CategoriesFormData = z.infer<typeof CategoriesSchema>;