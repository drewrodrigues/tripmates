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

class AttendRequest < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  # TODO: ensure user isn't already attending the trip (after attendees built)

  validate :must_be_friend_of_leader
  validates :trip, uniqueness: { scope: :user, message: "already has attend request pending" }

  private

  def must_be_friend_of_leader
    unless user.friends_with?(trip.creator)
      errors.add(:leader, "must be your friend")
    end
  end
end
