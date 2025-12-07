// src/store/classesStore.js
import { create } from "zustand";
import { classesApi } from "@/api/classesApi";
import toast from "react-hot-toast";

export const useClassesStore = create((set) => ({
  classes: [],
  loading: false,
  error: null,

  // Lấy tất cả lớp
  fetchClasses: async () => {
    set({ loading: true });
    try {
      const data = await classesApi.getAllClasses();
      set({ classes: data, loading: false, error: null });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error("Lấy danh sách lớp thất bại!");
    }
  },


  createClass: async (classData) => {
    set({ loading: true });
    try {
      const newClass = await classesApi.createClasses(
        classData.name,
        classData.year,
        classData.maxStudents
      );
      set((state) => ({
        classes: [...state.classes, newClass],
        loading: false,
      }));
      toast.success("Thêm lớp thành công!");
      return newClass;
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.message || "Thêm lớp thất bại!");
      throw err;
    }
  },
  updateClass: async (id, classData) => {
    set({ loading: true });
    try {
      const updated = await classesApi.updateClasses(id, classData);
      set((state) => ({
        classes: state.classes.map((c) => (c.id === id ? updated : c)),
        loading: false,
      }));
      toast.success("Cập nhật lớp thành công!");
    } catch (err) {
      set({ loading: false });
      toast.error("Cập nhật thất bại!");
      throw err;
    }
  },
  deleteClass: async (id) => {
    try {
      await classesApi.deleteClass(id);
      set((state) => ({
        classes: state.classes.filter((c) => c.id !== id),
      }));
      toast.success("Xóa lớp thành công!");
    } catch (err) {
      toast.error("Xóa lớp thất bại!");
    }
  },
}));