import { z } from 'zod';

export const CompaniesSchema = z.object({
  id: z.string().optional(),
});

export type CompaniesFormData = z.infer<typeof CompaniesSchema>;