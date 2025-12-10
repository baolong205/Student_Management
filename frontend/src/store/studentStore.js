// store/studentStore.js
import { create } from "zustand";
import { studentApi } from "@/api/studentApi";
import { enrollmentsApi } from "../api/enrollmentApi";
import toast from "react-hot-toast";

export const useStudentStore = create((set, get) => ({
  students: [],
  currentStudent: null,
  enrollments: [], // Enrollment của student hiện tại
  loading: false,

  // Student actions (giữ nguyên)
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

  fetchStudentDetail: async (id) => {
    set({ loading: true });
    try {
      const student = await studentApi.getOneStudent(id);
      set({
        currentStudent: student,
        loading: false
      });
    } catch (err) {
      set({ loading: false });
      toast.error("Lấy thông tin sinh viên thất bại!");
      throw err;
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
        currentStudent: state.currentStudent?.id === id ? updated : state.currentStudent,
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

  // Enrollment actions - SỬA LẠI ĐỂ GỬI ĐỦ DATA
  fetchStudentEnrollments: async (studentId) => {
    set({ loading: true });
    try {
      const data = await enrollmentsApi.getByStudentId(studentId);
      set({
        enrollments: data,
        loading: false
      });
    } catch (err) {
      set({ loading: false });
      toast.error("Lấy danh sách môn học thất bại!");
      throw err;
    }
  },

  createEnrollment: async (studentId, subjectId, scores = {}) => {
    set({ loading: true });
    try {
      // ĐẢM BẢO GỬI ĐỦ 4 LOẠI ĐIỂM
      const enrollmentData = {
        studentId,
        subjectId,
        attendanceScore: scores.attendanceScore || 0,
        regularScore: scores.regularScore || 0,
        midtermScore: scores.midtermScore || 0,
        finalScore: scores.finalScore || 0
      };
      
      console.log('Sending enrollment data to API:', enrollmentData);
      
      const enrollment = await enrollmentsApi.create(enrollmentData);
      
      console.log('API Response:', enrollment);
      
      set((state) => ({
        enrollments: [...state.enrollments, enrollment],
        loading: false,
      }));
      
      toast.success("Đăng ký môn học thành công!");
      return enrollment;
    } catch (err) {
      set({ loading: false });
      console.error('Create enrollment error:', err);
      toast.error(err.response?.data?.message || "Đăng ký môn học thất bại!");
      throw err;
    }
  },

  updateEnrollment: async (enrollmentId, updateData) => {
    set({ loading: true });
    try {
      console.log('Updating enrollment:', enrollmentId, updateData);
      
      const updated = await enrollmentsApi.update(enrollmentId, updateData);
      
      console.log('Update response:', updated);
      
      set((state) => ({
        enrollments: state.enrollments.map(e =>
          e.id === enrollmentId ? updated : e
        ),
        loading: false,
      }));
      
      toast.success("Cập nhật điểm thành công!");
      return updated;
    } catch (err) {
      set({ loading: false });
      console.error('Update enrollment error:', err);
      toast.error(err.response?.data?.message || "Cập nhật điểm thất bại!");
      throw err;
    }
  },

  deleteEnrollment: async (enrollmentId) => {
    set({ loading: true });
    try {
      await enrollmentsApi.delete(enrollmentId);
      set((state) => ({
        enrollments: state.enrollments.filter(e => e.id !== enrollmentId),
        loading: false,
      }));
      toast.success("Hủy đăng ký môn học thành công!");
    } catch (err) {
      set({ loading: false });
      toast.error("Hủy đăng ký thất bại!");
      throw err;
    }
  },

  getEnrollmentsByStudentId: (studentId) => {
    const state = get();
    return state.enrollments.filter(e => e.studentId === studentId);
  },
  
  calculateStudentGPA: (studentId) => {
    const state = get();
    const studentEnrollments = state.enrollments.filter(e => e.studentId === studentId);
    if (studentEnrollments.length === 0) return 0;

    const totalScore = studentEnrollments.reduce((sum, e) => sum + e.totalScore, 0);
    return totalScore / studentEnrollments.length;
  },
  
  resetCurrentStudent: () => {
    set({
      currentStudent: null,
      enrollments: []
    });
  }
}));