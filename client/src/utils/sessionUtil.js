import axios from 'axios'

// TODO: PULL INTO USER UTIL
export const signUp = formData => {
  return axios({
    method: "post",
    url: "/api/users",
    data: formData,
    contentType: false,
    processData: false
  })
}

export const login = user => {
  return axios({
    method: "post",
    url: "/api/session",
    data: {user: user}
  })
}

export const logout = () => {
  return axios({
    method: "delete",
    url: "api/session"
  })
}