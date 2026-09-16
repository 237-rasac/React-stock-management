import { z } from 'zod';

export const CustomersSchema = z.object({
  id: z.string().optional(),
});

export type CustomersFormData = z.infer<typeof CustomersSchema>;