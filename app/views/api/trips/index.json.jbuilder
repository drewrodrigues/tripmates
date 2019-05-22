json.trips({})
json.users({})

json.set! "trips" do
  json.partial! @trips
end

json.set! "users" do
  @trips.each do |trip|
    json.partial! "api/users/user", user: trip.creator
  end
end