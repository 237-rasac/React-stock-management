import { z } from 'zod';

export const StockSchema = z.object({
  id: z.string().optional(),
});

export type StockFormData = z.infer<typeof StockSchema>;