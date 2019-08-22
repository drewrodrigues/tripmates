json.set! itinerary_item.id do
  json.extract! itinerary_item,
                :id,
                :trip_id,
                :title,
                :start_time,
                :end_time,
                :start_date,
                :end_date,
                :description,
                :position
end