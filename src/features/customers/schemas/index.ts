import { z } from "zod";

/**
 * Customers form schema — mirrors swagger `ClientRequestDTO`
 * (nom + prenom required; contact fields validated loosely when present).
 * Messages in French to match the schema convention.
 */
export const CustomersSchema = z.object({
  lastName: z
    .string()
    .min(1, "Le nom est obligatoire")
    .max(50, "Le nom ne peut dépasser 50 caractères"),
  firstName: z
    .string()
    .min(1, "Le prénom est obligatoire")
    .max(50, "Le prénom ne peut dépasser 50 caractères"),
  addressLine1: z
    .string()
    .max(255, "L’adresse ne peut dépasser 255 caractères")
    .optional(),
  addressLine2: z
    .string()
    .max(255, "L’adresse ne peut dépasser 255 caractères")
    .optional(),
  city: z
    .string()
    .max(100, "La ville ne peut dépasser 100 caractères")
    .optional(),
  postalCode: z
    .string()
    .max(20, "Le code postal ne peut dépasser 20 caractères")
    .optional(),
  country: z
    .string()
    .max(100, "Le pays ne peut dépasser 100 caractères")
    .optional(),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  phone: z
    .string()
    .max(20, "Le téléphone ne peut dépasser 20 caractères")
    .optional(),
  photo: z.string().url("URL invalide").optional().or(z.literal("")),
});

export type CustomersFormData = z.infer<typeof CustomersSchema>;
