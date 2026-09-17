import { z } from "zod";

/**
 * Supplier-order form schema — mirrors swagger `CommandeFournisseurRequestDTO`:
 * a supplier + at least one line { articleId, quantite > 0 }. Line pricing is
 * server-side, so there is nothing price-related to validate here.
 * Messages in French to match the schema convention.
 */

/** One order line — article picked from the catalog, positive quantity. */
export const SupplierOrderLineSchema = z.object({
  articleId: z.string().min(1, "Sélectionnez un article"),
  quantity: z
    .number({ message: "Quantité invalide" })
    .int("La quantité doit être un entier")
    .positive("La quantité doit être supérieure à 0")
    .max(100000, "La quantité est trop élevée"),
});

export const SupplierOrderSchema = z.object({
  supplierId: z.string().min(1, "Sélectionnez un fournisseur"),
  lines: z
    .array(SupplierOrderLineSchema)
    .min(1, "Ajoutez au moins un article à la commande"),
});

export type SupplierOrderLineFormData = z.infer<typeof SupplierOrderLineSchema>;
export type SupplierOrderFormData = z.infer<typeof SupplierOrderSchema>;
