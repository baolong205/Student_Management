
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
  },
  // Lấy danh sách đăng ký của một môn học
  getSubjectEnrollments: async (subjectId) => {
    const response = await api.get(`/subjects/${subjectId}/enrollments`);
    return response.data;
  },

  // Lấy danh sách sinh viên đang học môn đó
  getSubjectStudents: async (subjectId) => {
    const response = await api.get(`/subjects/${subjectId}/students`);
    return response.data;
  },

  // Lấy thống kê môn học (số lượng SV, tỷ lệ qua, điểm trung bình...)
  getSubjectStats: async (subjectId) => {
    const response = await api.get(`/subjects/${subjectId}/stats`);
    return response.data;
  },
};
