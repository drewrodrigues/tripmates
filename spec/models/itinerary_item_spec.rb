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
