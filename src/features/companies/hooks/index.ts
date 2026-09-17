import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { CompaniesApi } from "../api";
import type { CompaniesFormData } from "../schemas";
import { toastSuccess } from "@/lib/toast";

/**
 * Companies hooks — the "Categories pattern" (P0.2/P2): domain data from
 * queryFn, key factory, invalidation on mutation, success toasts; failures
 * are toasted globally by the MutationCache (P1.4).
 */
export const companiesKeys = {
  all: ["companies"] as const,
  list: () => ["companies", "list"] as const,
  detail: (id: string) => ["companies", "detail", id] as const,
};

export const useCompanies = () => {
  return useQuery({
    queryKey: companiesKeys.list(),
    queryFn: () => CompaniesApi.getAll(),
  });
};

export const useCompany = (id: string) => {
  return useQuery({
    queryKey: companiesKeys.detail(id),
    queryFn: () => CompaniesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("companies");
  return useMutation({
    mutationFn: (data: CompaniesFormData) => CompaniesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.all });
      toastSuccess(t("toast.created"));
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("companies");
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CompaniesFormData }) =>
      CompaniesApi.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.all });
      queryClient.invalidateQueries({
        queryKey: companiesKeys.detail(variables.id),
      });
      toastSuccess(t("toast.updated"));
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("companies");
  return useMutation({
    mutationFn: (id: string) => CompaniesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.all });
      toastSuccess(t("toast.deleted"));
    },
  });
};
