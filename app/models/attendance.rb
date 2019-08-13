# == Schema Information
#
# Table name: attendances
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  trip_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Attendance < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  validate :leader_cant_attend
  validate :unique_record
  validate :attend_request_must_exist

  private

  def leader_cant_attend
    if trip.creator.id == user_id
      errors.add(:you, "are already leading this trip")
      throw :abort
    end
  end

  def attend_request_must_exist
    unless AttendRequest.find_by(user: user, trip: trip)
      errors.add(:attend_request, "must be made first")
      throw :abort
    end
  end

  def unique_record
    if record_exists_and_not_this_one
      errors.add(:you, "are already attending this trip")
      throw :abort
    end
  end

  def record_exists_and_not_this_one
    attendance = Attendance.find_by(user: user, trip: trip)
    attendance && attendance.id != id
  end
end
