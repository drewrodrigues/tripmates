json.attend_requests({})
json.users({})

json.set! "attend_requests" do
  json.partial! @attend_requests
end

json.set! "users" do
  @attend_requests.each do |attend_request|
    json.partial! "api/users/user", user: attend_request.user
  end
end
