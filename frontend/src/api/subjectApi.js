
import api from "./axios";

export const subjectApi = {
  // Tạo môn học mới
  createSubject: async (data) => {
    const response = await api.post('/subjects', data);
    return response.data;
  },
  
  // Lấy tất cả môn học
  getAllSubjects: async () => {
    const response = await api.get('/subjects');
    return response.data;
  },
  
  // Lấy thông tin một môn học
  getOneSubject: async (id) => {
    const response = await api.get(`/subjects/${id}`);
    return response.data;
  },
  
  // Cập nhật môn học 
  updateSubject: async (id, data) => {
    const response = await api.patch(`/subjects/${id}`, data);
    return response.data;
  },
  
  // Xóa môn học
  deleteSubject: async (id) => {
    await api.delete(`/subjects/${id}`);
  }
};
