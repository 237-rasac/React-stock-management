import { useQuery } from "@tanstack/react-query";
import { DashboardApi } from "../api";

/** Query-key factory for dashboard queries. */
export const dashboardKeys = {
  all: ["dashboard"] as const,
  kpis: () => [...dashboardKeys.all, "kpis"] as const,
  charts: () => [...dashboardKeys.all, "charts"] as const,
};

export const useDashboardKPIs = () => {
  return useQuery({
    queryKey: dashboardKeys.kpis(),
    queryFn: () => DashboardApi.getKPIs(),
  });
};

export const useDashboardCharts = () => {
  return useQuery({
    queryKey: dashboardKeys.charts(),
    queryFn: () => DashboardApi.getCharts(),
  });
};
