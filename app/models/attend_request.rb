# == Schema Information
#
# Table name: attend_requests
#
#  id         :bigint           not null, primary key
#  trip_id    :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_attend_requests_on_trip_id_and_user_id  (trip_id,user_id) UNIQUE
#

class AttendRequest < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  # TODO: ensure user isn't already attending the trip (after attendees built)

  validates :trip, uniqueness: {
    cope: :user,
    message: "already has attend request pending",
  }
  validate :trip_is_public
  validate :must_be_friend_of_leader

  private

  def trip_is_public
    return unless trip

    if trip.privacy != "visible"
      errors.add(:trip, "must be public")
    end
  end

  def must_be_friend_of_leader
    return unless trip&.creator

    unless user.friends_with?(trip.creator)
      errors.add(:leader, "must be your friend")
    end
  end
end
