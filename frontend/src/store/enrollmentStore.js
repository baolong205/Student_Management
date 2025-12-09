// stores/enrollmentsStore.js
import { create } from 'zustand'
import { enrollmentsApi } from '../api/enrollmentApi'

export const useEnrollmentsStore = create((set, get) => ({
  // State
  enrollments: [],
  currentEnrollment: null,
  isLoading: false,
  error: null,
  isDialogOpen: false,
  selectedEnrollment: null,

  // Actions
  // 1. Lấy tất cả enrollments
  fetchEnrollments: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await enrollmentsApi.getAll()
      set({ enrollments: data, isLoading: false })
      return data
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  // 2. Tạo enrollment mới
  createEnrollment: async (enrollmentData) => {
    set({ isLoading: true, error: null })
    try {
      const newEnrollment = await enrollmentsApi.create(enrollmentData)
      
      set((state) => ({
        enrollments: [...state.enrollments, newEnrollment],
        isLoading: false,
      }))
      
      return newEnrollment
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  // 3. Cập nhật enrollment
  updateEnrollment: async (id, updateData) => {
    set({ isLoading: true, error: null })
    try {
      const updatedEnrollment = await enrollmentsApi.update(id, updateData)
      
      set((state) => ({
        enrollments: state.enrollments.map(item => 
          item.id === id ? updatedEnrollment : item
        ),
        currentEnrollment: updatedEnrollment,
        isLoading: false,
      }))
      
      return updatedEnrollment
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  // 4. Xóa enrollment
  deleteEnrollment: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await enrollmentsApi.delete(id)
      
      set((state) => ({
        enrollments: state.enrollments.filter(item => item.id !== id),
        isLoading: false,
      }))
      
      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  // 5. Mở dialog thêm/sửa
  openDialog: (enrollment = null) => {
    set({ 
      isDialogOpen: true,
      selectedEnrollment: enrollment 
    })
  },

  // 6. Đóng dialog
  closeDialog: () => {
    set({ 
      isDialogOpen: false,
      selectedEnrollment: null 
    })
  },

  // 7. Reset state
  reset: () => {
    set({
      enrollments: [],
      currentEnrollment: null,
      error: null,
    })
  }
}))