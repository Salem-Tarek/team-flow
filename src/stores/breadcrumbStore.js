import { create } from "zustand";

export const useBreadcrumbStore = create((set) => ({
    breadcrumbItems: [],

    setBreadcrumbItems: (breadcrumbItems) => set({ breadcrumbItems }),
}))