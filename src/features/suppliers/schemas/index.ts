import { z } from "zod";

/**
 * Suppliers form schema — mirrors swagger `FournisseurRequestDTO`
 * (only `nom` required; contact fields validated loosely when present).
 * Messages in French to match the schema convention.
 */
export const SuppliersSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est obligatoire")
    .max(100, "Le nom ne peut dépasser 100 caractères"),
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
});

export type SuppliersFormData = z.infer<typeof SuppliersSchema>;
