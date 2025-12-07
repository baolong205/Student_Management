import api from "./axios";

export const studentApi = {
  createStudent: async (data) => {
    const response = await api.post('/students', { data })
    return response.data
  },
  getAllStudent: async () => {
    const response = await api.get('/students')
    return response.data
  },
  getOneStudent: async (id) => {
    const response = await api.get(`/students/${id}`)
    return response.data
  },
  updateStudent: async (id, data) => {
    const response = await api.put(`/students/${id}`, data);
    return response.data;
  },
  deleteStudent: async (id) => {
    await api.delete(`/students/${id}`)
  },
}