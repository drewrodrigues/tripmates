json.set! "trip" do
  json.set! @trip.id do
    json.extract! @trip, :id,
      :creator_id,
      :days_until,
      :details,
      :duration,
      :end_date,
      :location,
      :privacy,
      :spaces,
      :start_date,
      :title
    json.coverPhoto url_for(@trip.cover_photo) if @trip.cover_photo.attached?
  end
end

json.set! "user" do
  json.partial! "api/users/user", user: @trip.creator
end