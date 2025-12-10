// src/stores/dashboardStore.js
import { create } from "zustand";
import { dashboardApi } from "@/api/dashboardApi";
import toast from "react-hot-toast";

export const useDashboardStore = create((set, get) => ({
  dashboardData: null,
  loading: false,
  error: null,

  // Lấy dữ liệu dashboard
  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await dashboardApi.getAdminDashboard();
      set({ 
        dashboardData: data, 
        loading: false 
      });
      return data;
    } catch (err) {
      set({ 
        loading: false, 
        error: err.message 
      });
      toast.error("Lấy dữ liệu dashboard thất bại!");
      throw err;
    }
  },

  // Refresh dữ liệu
  refreshDashboard: async () => {
    return get().fetchDashboardData();
  },

  // Reset store
  resetDashboard: () => {
    set({ 
      dashboardData: null, 
      loading: false, 
      error: null 
    });
  },
}));