json.itinerary_items({})
json.attendance({})

json.set! "itinerary_items" do
  json.partial! @itinerary_items
end

json.set! "attendance" do
  json.partial! "api/attendances/attendance", attendance: @attendance if @attendance
end