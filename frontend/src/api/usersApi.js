// frontend/src/api/usersApi.js
import api from "./axios";

export const usersApi = {
  /**
   * Tạo người dùng mới (register)
   */
  createUser: async (data) => {
    const response = await api.post("/users", data);
    return response.data;
  },

  /**
   * Lấy danh sách tất cả người dùng
   */
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  /**
   * Lấy thông tin một người dùng theo ID
   */
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Cập nhật thông tin người dùng
   */
  updateUser: async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Xóa người dùng
   */
  deleteUser: async (id) => {
    await api.delete(`/users/${id}`);
  },

  /**
   * Tìm kiếm người dùng theo tên đăng nhập
   */
  searchUsers: async (username) => {
    const response = await api.get(`/users/search?username=${username}`);
    return response.data;
  },

  /**
   * Lấy người dùng theo vai trò
   */
  getUsersByRole: async (role) => {
    const response = await api.get(`/users/role/${role}`);
    return response.data;
  },

  /**
   * Thay đổi vai trò người dùng
   */
  changeUserRole: async (id, role) => {
    const response = await api.patch(`/users/${id}/role`, { role });
    return response.data;
  },

  /**
   * Đổi mật khẩu người dùng
   */
  changePassword: async (id, data) => {
    const response = await api.patch(`/users/${id}/password`, data);
    return response.data;
  },

  /**
   * Lấy thống kê người dùng
   */
  getUserStats: async () => {
    const response = await api.get("/users/stats");
    return response.data;
  }
};