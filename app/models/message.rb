# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  user_id    :integer          not null
#  trip_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_messages_on_trip_id  (trip_id)
#  index_messages_on_user_id  (user_id)
#

class Message < ApplicationRecord
  belongs_to :user
  belongs_to :trip

  validate :must_be_leader_or_attendee_of_trip
  validates :body, presence: true

  private

  def must_be_leader_or_attendee_of_trip
    return unless user

    unless user.attending_trips.where(id: trip_id).exists? ||
           user.created_trips.where(id: trip_id).exists?
      errors.add(:you, "must be on the trip to message")
    end
  end
end
