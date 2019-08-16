json.attendances({})
json.users({})

json.attendances do
  json.partial! @attendances
end

json.users do
  @attendances.each do |attendance|
    json.partial! attendance.user
  end
end
