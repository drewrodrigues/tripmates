json.set! message.id do
  json.extract! message, :id, :body, :trip_id
end
