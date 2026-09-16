import { z } from 'zod';

export const SalesSchema = z.object({
  id: z.string().optional(),
});

export type SalesFormData = z.infer<typeof SalesSchema>;