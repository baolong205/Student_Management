// frontend/src/store/userStore.js
import { create } from 'zustand';
import { usersApi } from '../api/usersApi';

export const useUserStore = create((set, get) => ({

  users: [],
  currentUser: null,
  loading: false,
  error: null,

  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const newUser = await usersApi.createUser(userData);
      set((state) => ({
        users: [...state.users, newUser],
        loading: false
      }));
      return newUser;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Tạo người dùng thất bại'
      });
      throw error;
    }
  },
  fetchAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await usersApi.getAllUsers();
      set({ users, loading: false });
      return users;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Lấy danh sách người dùng thất bại'
      });
      throw error;
    }
  },

  fetchUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const user = await usersApi.getUserById(id);

      // Cập nhật trong danh sách users
      set((state) => ({
        users: state.users.map(u => u.id === id ? user : u),
        loading: false
      }));

      return user;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Lấy thông tin người dùng thất bại'
      });
      throw error;
    }
  },
  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await usersApi.updateUser(id, userData);

      set((state) => ({
        users: state.users.map(user =>
          user.id === id ? { ...user, ...updatedUser } : user
        ),
        // Nếu đang cập nhật chính user đang đăng nhập
        ...(get().currentUser?.id === id && { currentUser: updatedUser }),
        loading: false
      }));

      return updatedUser;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Cập nhật người dùng thất bại'
      });
      throw error;
    }
  },
  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await usersApi.deleteUser(id);

      set((state) => ({
        users: state.users.filter(user => user.id !== id),
        // Nếu xóa chính user đang đăng nhập, đăng xuất
        ...(get().currentUser?.id === id && { currentUser: null }),
        loading: false
      }));
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Xóa người dùng thất bại'
      });
      throw error;
    }
  },
  changeUserRole: async (id, role) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await usersApi.changeUserRole(id, role);

      set((state) => ({
        users: state.users.map(user =>
          user.id === id ? { ...user, role } : user
        ),
        // Nếu đang thay đổi role của chính user đang đăng nhập
        ...(get().currentUser?.id === id && { currentUser: { ...get().currentUser, role } }),
        loading: false
      }));

      return updatedUser;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Thay đổi vai trò thất bại'
      });
      throw error;
    }
  },
  setCurrentUser: (user) => {
    set({ currentUser: user });

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  },
  restoreUserFromStorage: () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        set({ currentUser: user });
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  },
  fetchUserStats: async () => {
    set({ loading: true, error: null });
    try {
      const stats = await usersApi.getUserStats();
      set({ loading: false, userStats: stats });
      return stats;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Lấy thống kê thất bại'
      });
      throw error;
    }
  },

  searchUsers: async (username) => {
    set({ loading: true, error: null });
    try {
      const users = await usersApi.searchUsers(username);
      set({ loading: false });
      return users;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Tìm kiếm thất bại'
      });
      throw error;
    }
  },

  getUsersByRole: async (role) => {
    set({ loading: true, error: null });
    try {
      const users = await usersApi.getUsersByRole(role);
      set({ loading: false });
      return users;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Lấy người dùng theo vai trò thất bại'
      });
      throw error;
    }
  }
  ,

  logout: () => {
    set({ currentUser: null });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token'); // Nếu có lưu token
  },
  getUsersByRole: (role) => {
    return get().users.filter(user => user.role === role);
  },
  searchUsersByUsername: (keyword) => {
    return get().users.filter(user =>
      user.username.toLowerCase().includes(keyword.toLowerCase())
    );
  },
  clearError: () => set({ error: null }),
  reset: () => set({
    users: [],
    currentUser: null,
    loading: false,
    error: null
  })
}));