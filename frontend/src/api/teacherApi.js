// src/api/teacherApi.js
import api from './axios'

export const teacherApi = {
  // Lấy tất cả giáo viên
  getAllTeachers: async () => {
    const response = await api.get('/teachers')
    return response.data
  },

  // Lấy một giáo viên theo ID
  getOneTeacher: async (id) => {
    const response = await api.get(`/teachers/${id}`)
    return response.data
  },

  // Tạo giáo viên mới
  createTeacher: async (teacherData) => {
    // Format date trước khi gửi
    const formattedData = formatTeacherData(teacherData)
    const response = await api.post('/teachers', formattedData)
    return response.data
  },

  // Cập nhật giáo viên
  updateTeacher: async (id, teacherData) => {
    // Format date trước khi gửi
    const formattedData = formatTeacherData(teacherData)
    const response = await api.patch(`/teachers/${id}`, formattedData)
    return response.data
  },

  // Xóa giáo viên
  deleteTeacher: async (id) => {
    const response = await api.delete(`/teachers/${id}`)
    return response.data
  },

  // Tìm kiếm giáo viên (theo tên, email, môn, lớp...)
  searchTeachers: async (keyword) => {
    const response = await api.get('/teachers/search', {
      params: { q: keyword }
    })
    return response.data
  },

  // Lấy giáo viên theo môn học
  getTeachersBySubject: async (subjectId) => {
    const response = await api.get(`/teachers/subject/${subjectId}`)
    return response.data
  },

  // Lấy giáo viên theo lớp
  getTeachersByClass: async (classId) => {
    const response = await api.get(`/teachers/class/${classId}`)
    return response.data
  }
}

// Helper function: Format date thành YYYY-MM-DD cho MySQL
const formatTeacherData = (teacherData) => {
  // Tạo bản sao để không thay đổi dữ liệu gốc
  const formatted = { ...teacherData }

  // Format dateOfBirth nếu có
  if (formatted.dateOfBirth) {
    formatted.dateOfBirth = formatDateForMySQL(formatted.dateOfBirth)
  }

  return formatted
}

// Format date: Chuyển bất kỳ date nào thành string YYYY-MM-DD
const formatDateForMySQL = (dateInput) => {
  if (!dateInput) return undefined

  // Nếu đã là string YYYY-MM-DD thì giữ nguyên
  if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    return dateInput
  }

  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

    // Kiểm tra date hợp lệ
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', dateInput)
      return undefined
    }

    // Format: YYYY-MM-DD
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  } catch (error) {
    console.error('Error formatting date:', error, dateInput)
    return undefined
  }
}