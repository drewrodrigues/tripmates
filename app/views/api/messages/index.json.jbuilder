json.messages({})
json.users({})

json.set! "messages" do
  json.partial! @messages
end

json.set! "users" do
  @messages.each do |message|
    json.partial! "api/users/user", user: message.user
  end
end