import axios from 'axios'

// TODO: PULL INTO USER UTIL
export const signUp = formData => {
  return axios({
    method: "POST",
    url: "/api/users",
    data: formData,
    dataType: "JSON",
    contentType: false,
    processData: false
  })
}

export const login = user => {
  return axios({
    method: "POST",
    url: "/api/session",
    data: {user: user}
  })
}

export const logout = () => {
  return axios({
    method: "DELETE",
    url: "api/session"
  })
}