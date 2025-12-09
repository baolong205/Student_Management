// src/store/teacherStore.js
import { create } from "zustand";
import { teacherApi } from "@/api/teacherApi";
import toast from "react-hot-toast";

export const useTeacherStore = create((set, get) => ({
  teachers: [],
  currentTeacher: null,
  loading: false,
  error: null,

  // Lấy tất cả giáo viên
  fetchTeachers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await teacherApi.getAllTeachers();
      set({ teachers: data, loading: false });
    } catch (err) {
      const msg = err.response?.data?.message || "Lấy danh sách giáo viên thất bại!";
      toast.error(msg);
      set({ error: msg, loading: false });
    }
  },

  // Lấy chi tiết một giáo viên
  fetchTeacherDetail: async (id) => {
    set({ loading: true });
    try {
      const teacher = await teacherApi.getOneTeacher(id);
      set({ currentTeacher: teacher, loading: false });
      return teacher;
    } catch (err) {
      set({ loading: false });
      toast.error("Không tìm thấy giáo viên!");
      throw err;
    }
  },

  // Tạo giáo viên mới
  createTeacher: async (teacherData) => {
    set({ loading: true });
    try {
      // teacherData sẽ có dạng:
      // { firstName, lastName, email, ..., subjectIds: [], classIds: [] }
      const newTeacher = await teacherApi.createTeacher(teacherData);

      set((state) => ({
        teachers: [...state.teachers, newTeacher],
        loading: false,
      }));

      toast.success("Thêm giáo viên thành công!");
      return newTeacher;
    } catch (err) {
      set({ loading: false });
      const msg = err.response?.data?.message || "Thêm giáo viên thất bại!";
      toast.error(msg);
      throw err;
    }
  },

  // Cập nhật giáo viên
  updateTeacher: async (id, teacherData) => {
    set({ loading: true });
    try {
      const updated = await teacherApi.updateTeacher(id, teacherData);

      set((state) => ({
        teachers: state.teachers.map((t) => (t.id === id ? updated : t)),
        currentTeacher: state.currentTeacher?.id === id ? updated : state.currentTeacher,
        loading: false,
      }));

      toast.success("Cập nhật giáo viên thành công!");
      return updated;
    } catch (err) {
      set({ loading: false });
      const msg = err.response?.data?.message || "Cập nhật thất bại!";
      toast.error(msg);
      throw err;
    }
  },

  // Xóa giáo viên
  deleteTeacher: async (id) => {
    try {
      await teacherApi.deleteTeacher(id);
      set((state) => ({
        teachers: state.teachers.filter((t) => t.id !== id),
        currentTeacher: state.currentTeacher?.id === id ? null : state.currentTeacher,
      }));
      toast.success("Xóa giáo viên thành công!");
    } catch (err) {
      const msg = err.response?.data?.message || "Xóa giáo viên thất bại!";
      toast.error(msg);
      throw err;
    }
  },

  // Tìm kiếm giáo viên
  searchTeachers: async (keyword) => {
    set({ loading: true });
    try {
      const results = await teacherApi.searchTeachers(keyword);
      set({ teachers: results, loading: false });
      return results;
    } catch (err) {
      set({ loading: false });
      toast.error("Tìm kiếm thất bại!");
      throw err;
    }
  },

  // Reset currentTeacher khi rời trang chi tiết
  resetCurrentTeacher: () => {
    set({ currentTeacher: null });
  },
}));