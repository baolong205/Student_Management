import { authApi } from "@/api/authApi";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,

  //Dang nhap
  login: async (username, password) => {
    set({ isLoading: true })
    try {
      const data = await authApi.login(username, password)

      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))

      set({
        user: data.user,
        token: data.access_token,
        isLoggedIn: true,
        isLoading: false
      })
    } catch (error) {
      set({ isLoading: false })
      throw error;
    }

  },
  logout: () => {
    authApi.logout()
    set({ user: null, token: null, isLoggedIn: false })
  },
  //Khoi tao lai khi load trang
  initAuth: () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isLoggedIn: true,
      });
    }
  }


}))