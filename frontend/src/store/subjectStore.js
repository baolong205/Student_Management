
import { create } from "zustand";
import { subjectApi } from "@/api/subjectApi";
import toast from "react-hot-toast";

export const useSubjectStore = create((set) => ({
  subjects: [],
  loading: false,

  // Lấy danh sách tất cả môn học
  fetchSubjects: async () => {
    set({ loading: true });
    try {
      const data = await subjectApi.getAllSubjects();
      set({ subjects: data, loading: false });
    } catch (err) {
      set({ loading: false });
      toast.error("Lấy danh sách môn học thất bại!");
    }
  },

  // Tạo môn học mới
  createSubject: async (subjectData) => {
    set({ loading: true });
    try {
      const newSubject = await subjectApi.createSubject(subjectData);
      set((state) => ({
        subjects: [...state.subjects, newSubject],
        loading: false,
      }));
      toast.success("Thêm môn học thành công!");
      return newSubject;
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.message || "Thêm môn học thất bại!");
      throw err;
    }
  },

  // Cập nhật môn học
  updateSubject: async (id, subjectData) => {
    set({ loading: true });
    try {
      const updated = await subjectApi.updateSubject(id, subjectData);
      set((state) => ({
        subjects: state.subjects.map((s) => (s.id === id ? updated : s)),
        loading: false,
      }));
      toast.success("Cập nhật môn học thành công!");
      return updated;
    } catch (err) {
      set({ loading: false });
      toast.error("Cập nhật môn học thất bại!");
      throw err;
    }
  },

  // Xóa môn học
  deleteSubject: async (id) => {
    try {
      await subjectApi.deleteSubject(id);
      set((state) => ({
        subjects: state.subjects.filter((s) => s.id !== id),
      }));
      toast.success("Xóa môn học thành công!");
    } catch (err) {
      toast.error("Xóa môn học thất bại!");
    }
  },

  // Lấy thông tin một môn học
  getOneSubject: async (id) => {
    try {
      const subject = await subjectApi.getOneSubject(id);
      return subject;
    } catch (err) {
      toast.error("Không tìm thấy môn học!");
      throw err;
    }
  },
}));
