json.set! "friend" do
  json.partial! @friend_record, as: :friend_record
end

json.set! "user" do
  json.partial! "api/users/user", user: @friend
end
