json.friends({})
json.users({})

json.set! "friends" do
  json.partial! @friend_records, as: :friend_record
end

json.set! "users" do
  @friends.each do |friend|
    json.partial! "api/users/user", user: friend
  end
end