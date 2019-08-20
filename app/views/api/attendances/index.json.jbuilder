json.attendances({})
json.users({})
json.trip_counts({})

json.attendances do
  json.partial! @attendances
end

json.users do
  @attendances.each do |attendance|
    json.partial! attendance.user
  end
end

json.trip_counts do
  json.set! @trip.id do
    json.extract! @trip, :spaces_left
  end
end