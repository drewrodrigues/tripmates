json.set! attend_request.id do
  json.extract! attend_request, :id, :trip_id, :user_id
end