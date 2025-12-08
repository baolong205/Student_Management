// src/store/studentStore.js  (đổi tên file cho đúng)
import { create } from "zustand";
import { studentApi } from "@/api/studentApi";
import toast from "react-hot-toast";

export const useStudentStore = create((set) => ({
  students: [],
  loading: false,

  fetchStudents: async () => {
    set({ loading: true });
    try {
      const data = await studentApi.getAllStudent(); 
      set({ students: data, loading: false });
    } catch (err) {
      set({ loading: false });
      toast.error("Lấy danh sách sinh viên thất bại!");
    }
  },

  createStudent: async (studentData) => {
    set({ loading: true });
    try {
      const newStudent = await studentApi.createStudent(studentData);
      set((state) => ({
        students: [...state.students, newStudent],
        loading: false,
      }));
   
      return newStudent;
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.message || "Thêm thất bại!");
      throw err;
    }
  },

  updateStudent: async (id, studentData) => {
    set({ loading: true });
    try {
      const updated = await studentApi.updateStudent(id, studentData);
      set((state) => ({
        students: state.students.map((s) => (s.id === id ? updated : s)),
        loading: false,
      }));
    } catch (err) {
      set({ loading: false });
      toast.error("Cập nhật thất bại!");
      throw err;
    }
  },

  deleteStudent: async (id) => { 
    try {
      await studentApi.deleteStudent(id);
      set((state) => ({
        students: state.students.filter((s) => s.id !== id),
      }));
      toast.success("Xóa sinh viên thành công!");
    } catch (err) {
      toast.error("Xóa thất bại!");
    }
  },
}));