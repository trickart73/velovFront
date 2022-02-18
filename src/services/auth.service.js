import axios from 'axios'

const API_URL = 'http://192.168.1.168:8080/api/auth' // 192.168.1.168 //keyrus : 10.8.96.114
const register = (username, email, password) => axios.post(`${API_URL}signup`, {
  username,
  email,
  password,
})
const login = (username, password) => axios
  .post(`${API_URL}signin`, {
    username,
    password,
  })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  })
const logout = () => {
  localStorage.removeItem('user')
}
const getCurrentUser = () => JSON.parse(localStorage.getItem('user'))
export default {
  register,
  login,
  logout,
  getCurrentUser,
}
