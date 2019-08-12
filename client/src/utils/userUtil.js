import axios from 'axios'

export const getAllUsers = () => {
  return axios({
    url: "/api/users"
  })
}