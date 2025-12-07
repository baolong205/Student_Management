import api from './axios'

export const authApi = {
  login: async (username, password) => {
    const response = await api.post("/auth/login", { username, password })
    return response.data
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}