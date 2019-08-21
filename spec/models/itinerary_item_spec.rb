# == Schema Information
#
# Table name: itinerary_items
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :text
#  start_date  :date
#  end_date    :date
#  start_time  :time
#  end_time    :time
#  position    :integer
#  trip_id     :bigint
#  location    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_itinerary_items_on_trip_id  (trip_id)
#

require 'rails_helper'

RSpec.describe ItineraryItem, type: :model do
  it "validates presence of trip" do
    itinerary_item = ItineraryItem.new(title: "Peanut Butter")

    expect(itinerary_item.invalid?).to eq(true)
    expect(itinerary_item.errors.full_messages).to eq(["Trip must exist"])
  end

  it "validates presence of title" do
    trip = create(:trip)
    itinerary_item = ItineraryItem.new(trip: trip)

    expect(itinerary_item.invalid?).to eq(true)
    expect(itinerary_item.errors.full_messages).to eq(["Title can't be blank"])
  end
end
