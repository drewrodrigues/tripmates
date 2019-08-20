json.attendance do
  json.partial! @attendance
end

json.user do
  json.partial! @attendance.user
end