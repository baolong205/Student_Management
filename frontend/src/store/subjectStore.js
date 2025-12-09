import { create } from "zustand";
import { subjectApi } from "@/api/subjectApi";
import toast from "react-hot-toast";

export const useSubjectStore = create((set, get) => ({
  subjects: [],
  currentSubject: null, // Thêm currentSubject
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

  // Lấy chi tiết một môn học
  fetchSubjectDetail: async (id) => {
    set({ loading: true });
    try {
      const subject = await subjectApi.getOneSubject(id);
      set({ currentSubject: subject, loading: false });
      return subject;
    } catch (err) {
      set({ loading: false, currentSubject: null });
      toast.error("Không tìm thấy môn học!");
      throw err;
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
        currentSubject: state.currentSubject?.id === id ? updated : state.currentSubject,
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
        currentSubject: state.currentSubject?.id === id ? null : state.currentSubject,
      }));
      toast.success("Xóa môn học thành công!");
    } catch (err) {
      toast.error("Xóa môn học thất bại!");
    }
  },

  // Lấy thông tin một môn học (alias cho fetchSubjectDetail)
  getOneSubject: async (id) => {
    try {
      const subject = await subjectApi.getOneSubject(id);
      return subject;
    } catch (err) {
      toast.error("Không tìm thấy môn học!");
      throw err;
    }
  },

  // Reset currentSubject khi rời trang
  resetCurrentSubject: () => {
    set({ currentSubject: null });
  },

  // Tìm kiếm môn học
  searchSubjects: async (keyword) => {
    set({ loading: true });
    try {
      const results = await subjectApi.searchSubjects(keyword);
      set({ subjects: results, loading: false });
      return results;
    } catch (err) {
      set({ loading: false });
      toast.error("Tìm kiếm môn học thất bại!");
      throw err;
    }
  },

  // Lấy môn học theo học kỳ
  getSubjectsBySemester: async (semester) => {
    set({ loading: true });
    try {
      const results = await subjectApi.getSubjectsBySemester(semester);
      set({ subjects: results, loading: false });
      return results;
    } catch (err) {
      set({ loading: false });
      toast.error("Lấy danh sách môn học thất bại!");
      throw err;
    }
  },
  fetchSubjectEnrollments: async (subjectId) => {
    set({ loading: true });
    try {
      const enrollments = await subjectApi.getSubjectEnrollments(subjectId);
      set({ loading: false });
      return enrollments;
    } catch (err) {
      set({ loading: false });
      toast.error("Lấy danh sách đăng ký thất bại!");
      throw err;
    }
  },

  // Lấy danh sách sinh viên của môn học
  fetchSubjectStudents: async (subjectId) => {
    set({ loading: true });
    try {
      const students = await subjectApi.getSubjectStudents(subjectId);
      set({ loading: false });
      return students;
    } catch (err) {
      set({ loading: false });
      toast.error("Lấy danh sách sinh viên thất bại!");
      throw err;
    }
  },

  // Lấy thống kê môn học
  fetchSubjectStats: async (subjectId) => {
    set({ loading: true });
    try {
      const stats = await subjectApi.getSubjectStats(subjectId);
      set({ loading: false });
      return stats;
    } catch (err) {
      set({ loading: false });
      toast.error("Lấy thống kê môn học thất bại!");
      throw err;
    }
  },
}));