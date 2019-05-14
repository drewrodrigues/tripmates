json.set! "trip" do
  json.set! @trip.id do
    json.extract! @trip, :id,
      :start_date,
      :end_date,
      :title,
      :location,
      :creator_id,
      :duration,
      :days_until,
      :spaces,
      :privacy
    json.coverPhoto url_for(@trip.cover_photo)
  end
end

json.set! "user" do
  json.partial! "api/users/user", user: @trip.creator
end