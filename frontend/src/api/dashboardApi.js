
import api from "./axios";

export const dashboardApi = {

  getAdminDashboard: async () => {
    const response = await api.get('/dashboard/admin');
    return response.data;
  },
};