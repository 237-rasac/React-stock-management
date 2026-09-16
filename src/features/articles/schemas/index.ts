import { z } from 'zod';

export const ArticlesSchema = z.object({
  id: z.string().optional(),
});

export type ArticlesFormData = z.infer<typeof ArticlesSchema>;