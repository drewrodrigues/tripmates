json.set! attendance.id do
  json.extract! attendance, :id, :user_id, :trip_id
end
