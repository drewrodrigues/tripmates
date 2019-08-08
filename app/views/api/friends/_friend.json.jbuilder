json.set! friend_record.id do
  json.extract! friend_record, :id, :friend_one_id, :friend_two_id
end