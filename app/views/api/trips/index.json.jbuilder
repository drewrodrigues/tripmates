json.trips({})
json.trip_counts({})
json.users({})
json.attend_requests({})
json.attendances({})

json.set! "trips" do
  @trips.each do |trip|
    json.set! trip.id do
      json.extract! trip, :id,
                          :start_date,
                          :end_date,
                          :title,
                          :location,
                          :creator_id,
                          :duration,
                          :spaces,
                          :details,
                          :privacy
      json.coverPhoto url_for(trip.cover_photo) if trip.cover_photo.attached?
    end
  end
end

json.set! "trip_counts" do
  @trips.each do |trip|
    json.set! trip.id do
      json.spaces_left trip.spaces_left
    end
  end
end

json.set! "users" do
  @trips.each do |trip|
    json.partial! "api/users/user", user: trip.creator
  end
end

json.set! "attend_requests" do
  @trips.each do |trip|
    attend_request = trip.attend_request_for_user(current_user)

    if attend_request
      json.partial! "api/attend_requests/attend_request", attend_request: attend_request
    end
  end
end

json.set! "attendances" do
  @trips.each do |trip|
    attendance = trip.attendance_for_user(current_user)

    if attendance
      json.partial! "api/attendances/attendance", attendance: attendance
    end
  end
end
