json.set! @trip.id do
  json.extract! @trip, :id, :start_date, :end_date, :image_url, :title, :location, :creator_id
end