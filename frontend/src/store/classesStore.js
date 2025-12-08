// src/store/classesStore.js
import { create } from "zustand";
import { classesApi } from "../api/classesApi";
import toast from "react-hot-toast";

export const useClassesStore = create((set, get) => ({
  classes: [],
  loading: false,
  error: null,

  // Lấy tất cả lớp (có currentStudents realtime)
  fetchClasses: async () => {
    set({ loading: true, error: null });
    try {
      const data = await classesApi.getAllClasses();
      set({ classes: data, loading: false });
    } catch (err) {
      const msg = err.response?.data?.message || "Lấy danh sách lớp thất bại!";
      toast.error(msg);
      set({ error: msg, loading: false });
    }
  },

  // Thêm lớp mới
  createClass: async (classData) => {
    set({ loading: true });
    try {
      // Gửi đúng field backend mong đợi
      const payload = {
        name: classData.name,
        major: classData.major,
        enrollmentYear: classData.enrollmentYear,
        currentYear: classData.currentYear || 1,
        maxStudents: classData.maxStudents,
      };

      const newClass = await classesApi.createClass(payload);

      set((state) => ({
        classes: [...state.classes, newClass],
        loading: false,
      }));

      toast.success("Thêm lớp thành công!");
      return newClass;
    } catch (err) {
      set({ loading: false });
      const msg = err.response?.data?.message || "Thêm lớp thất bại!";
      toast.error(msg);
      throw err;
    }
  },

  // Cập nhật lớp
  updateClass: async (id, classData) => {
    set({ loading: true });
    try {
      const payload = {
        name: classData.name,
        major: classData.major,
        enrollmentYear: classData.enrollmentYear,
        currentYear: classData.currentYear,
        maxStudents: classData.maxStudents,
      };

      const updatedClass = await classesApi.updateClass(id, payload);

      set((state) => ({
        classes: state.classes.map((c) =>
          c.id === id ? updatedClass : c
        ),
        loading: false,
      }));

      toast.success("Cập nhật lớp thành công!");
      return updatedClass;
    } catch (err) {
      set({ loading: false });
      const msg = err.response?.data?.message || "Cập nhật thất bại!";
      toast.error(msg);
      throw err;
    }
  },

  // Xóa lớp
  deleteClass: async (id) => {
    try {
      await classesApi.deleteClass(id);
      set((state) => ({
        classes: state.classes.filter((c) => c.id !== id),
      }));
      toast.success("Xóa lớp thành công!");
    } catch (err) {
      const msg = err.response?.data?.message || "Xóa lớp thất bại!";
      toast.error(msg);
      throw err;
    }
  },
}));