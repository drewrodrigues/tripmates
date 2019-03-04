json.set! friend_request.id do
  json.extract! friend_request, :id, :requestee_id, :requester_id
end