
import { create } from "zustand";
import { teacherApi } from "@/api/teacherApi";
import toast from "react-hot-toast";

export const useTeacherStore = create((set, get) => ({
  teachers: [],
  currentTeacher: null,
  loading: false,
  error: null,
  isFetchingDetail: false,
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

  fetchTeacherDetail: async (id) => {
    const state = get();

    // Nếu đang fetch hoặc đã có currentTeacher với ID này, không fetch lại
    if (state.isFetchingDetail || (state.currentTeacher?.id === id && !state.loading)) {
      console.log("store: Skipping fetch - already fetching or has data");
      return state.currentTeacher;
    }

    set({ loading: true, isFetchingDetail: true, error: null });
    try {
      console.log("store: Fetching teacher detail for ID:", id);
      const teacher = await teacherApi.getOneTeacher(id);
      console.log("store: Teacher detail received:", teacher);

      set({
        currentTeacher: teacher,
        loading: false,
        isFetchingDetail: false
      });
      return teacher;
    } catch (err) {
      console.error("store: Error in fetchTeacherDetail:", err);
      set({
        loading: false,
        isFetchingDetail: false,
        error: err.response?.data?.message || err.message
      });
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