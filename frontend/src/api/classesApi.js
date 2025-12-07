import api from "./axios";

export const classesApi = {
  createClasses: async (name, year, maxStudents) => {
    const response = await api.post('/classes/', { name, year, maxStudents })
    return response.data
  },
  getAllClasses: async () => {
    const response = await api.get('/classes/')
    return response.data
  },
  getOneClass: async (id) => {
    const response = await api.get(`/classes/${id}`)
    return response.data
  },
  updateClasses: async (id, data) => {
    const response = await api.put(`/classes/${id}`, data);
    return response.data;
  },
  deleteClass: async (id) => {
    await api.delete(`/classes/${id}`)
  },
}