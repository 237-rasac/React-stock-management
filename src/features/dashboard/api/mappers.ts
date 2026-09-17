import type { DashboardKpisDTO } from "../types";
import type { DashboardKpis } from "../types";

/** `DashboardKpisDTO` → `DashboardKpis` (French wire names → domain names). */
export function toDashboardKpis(dto: DashboardKpisDTO): DashboardKpis {
  return {
    stockValue: dto.valeurStock ?? 0,
    alertCount: dto.nbArticlesEnAlerte ?? 0,
    customerOrdersInProgress: dto.nbCommandesClientEnCours ?? 0,
    supplierOrdersPending: dto.nbCommandesFournisseurEnAttente ?? 0,
    salesThisMonth: dto.nbVentesDuMois ?? 0,
    revenueThisMonth: dto.chiffreAffairesDuMois ?? 0,
  };
}
