json.trips({})

json.set! "trips" do
  @trips.each do |trip|
    json.set! trip.id do
      json.extract! trip, :id, :start_date, :end_date, :title, :location, :creator_id, :duration, :days_until
    end
  end
end

json.set! "users" do
  @trips.each do |trip|
    creator = trip.creator

    json.set! creator.id do
      json.extract! creator, :id, :first_name, :last_name, :email
      json.fullName "#{creator.first_name} #{creator.last_name}"
    end
  end
end