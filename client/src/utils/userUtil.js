import axios from 'axios'

window.axios = axios

export const getAllUsers = () => {
  return axios({
    url: "/api/users"
  })
}