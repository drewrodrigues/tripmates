json.set! "trip" do
  json.partial! @trip
end

json.set! "user" do
  json.partial! "api/users/user", user: @trip.creator
end