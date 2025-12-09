// enrollmentsApi.js
import api from './axios'

export const enrollmentsApi = {
  // 1. Lấy tất cả enrollments
  getAll: async () => {
    const response = await api.get("/enrollments")
    return response.data
  },

  // 2. Lấy chi tiết một enrollment
  getById: async (id) => {
    const response = await api.get(`/enrollments/${id}`)
    return response.data
  },

  // 3. Tạo enrollment mới
  create: async (enrollmentData) => {
    const response = await api.post("/enrollments", enrollmentData)
    return response.data
  },

  // 4. Cập nhật enrollment (sửa điểm)
  update: async (id, updateData) => {
    const response = await api.patch(`/enrollments/${id}`, updateData)
    return response.data
  },

  // 5. Xóa enrollment
  delete: async (id) => {
    const response = await api.delete(`/enrollments/${id}`)
    return response.data
  }
}