export const signup = user => {
  return $.ajax({
    type: "POST",
    url: "api/users",
    data: {user: user},
    dataType: "JSON"
  });
};

export const login = user => {
  console.log(user);
  return $.ajax({
    type: "POST",
    url: "api/session",
    data: {user: user},
    dataType: "JSON"
  });
};

export const logout = () => {
  return $.ajax({
    type: "DELETE",
    url: "api/session",
    dataType: "JSON"
  });
};