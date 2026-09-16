import { z } from 'zod';

export const AuthSchema = z.object({
  id: z.string().optional(),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export type AuthFormData = z.infer<typeof AuthSchema>;