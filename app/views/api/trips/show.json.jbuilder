json.set!("attend_requests", {})

json.set! "trip" do
  json.set! @trip.id do
    json.extract! @trip, :id,
      :creator_id,
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

  # TODO: ensure includes (no n+1)
  # TODO: refactor and pull out /api/trips/:id/attend_requests on backend
  @trip.attend_requests.each do |attend_request|
    json.partial! "api/users/user", user: attend_request.user
  end
end

json.set! "attend_requests" do
  @trip.attend_requests.each do |attend_request|
    json.partial! "api/attend_requests/attend_request", attend_request: attend_request
  end
end