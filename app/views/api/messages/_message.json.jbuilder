json.set! message.id do
  json.extract! message, :id, :body, :trip_id, :user_id, :created_at
end
