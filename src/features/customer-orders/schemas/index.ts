import { z } from 'zod';

export const CustomerOrdersSchema = z.object({
  id: z.string().optional(),
});

export type CustomerOrdersFormData = z.infer<typeof CustomerOrdersSchema>;