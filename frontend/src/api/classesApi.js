
import api from "./axios";

export const classesApi = {
  // Tạo lớp mới
  createClass: async (data) => {
    const response = await api.post("/classes", data);
    return response.data;
  },

  
  getAllClasses: async () => {
    const response = await api.get("/classes");
    return response.data;
  },


  getOneClass: async (id) => {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  },

 
  updateClass: async (id, data) => {
    const response = await api.put(`/classes/${id}`, data);
    return response.data;
  },

  // Xóa lớp
  deleteClass: async (id) => {
    await api.delete(`/classes/${id}`);
  },
};