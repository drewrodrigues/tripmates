import $ from 'jquery'

export const getAllUsers = () => {
  return $.ajax({
    url: "/api/users"
  })
}