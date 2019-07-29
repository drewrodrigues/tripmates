json.trips({})
json.users({})

json.set! "trips" do
  @trips.each do |trip|
    json.set! trip.id do
      json.extract! trip, :id, :start_date, :end_date, :title, :location, :creator_id, :duration, :days_until
      json.coverPhoto url_for(trip.cover_photo) if trip.cover_photo.attached?
    end
  end
end

json.set! "users" do
  @trips.each do |trip|
    json.partial! "api/users/user", user: trip.creator
  end
end