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

# TODO: ensure foreign_key database constraint on trip_id

class ItineraryItem < ApplicationRecord
  belongs_to :trip

  has_one_attached :photo
  has_many_attached :files

  validates :title, presence: true
end
