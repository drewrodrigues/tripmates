// TODO: PULL INTO USER UTIL
export const signUp = formData => {
  return $.ajax({
    type: "POST",
    url: "/api/users",
    data: formData,
    dataType: "JSON",
    contentType: false,
    processData: false
  })
}

export const login = user => {
  return $.ajax({
    type: "POST",
    url: "/api/session",
    data: {user: user}
  })
}

export const logout = () => {
  return $.ajax({
    type: "DELETE",
    url: "api/session"
  })
}