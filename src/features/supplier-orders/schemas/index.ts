import { z } from 'zod';

export const SupplierOrdersSchema = z.object({
  id: z.string().optional(),
});

export type SupplierOrdersFormData = z.infer<typeof SupplierOrdersSchema>;