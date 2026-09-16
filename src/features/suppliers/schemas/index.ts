import { z } from 'zod';

export const SuppliersSchema = z.object({
  id: z.string().optional(),
});

export type SuppliersFormData = z.infer<typeof SuppliersSchema>;