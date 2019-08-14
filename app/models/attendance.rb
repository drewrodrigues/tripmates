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

  before_create :destroy_attend_request!

  validate :leader_cant_attend
  validate :unique_record
  validate :attend_request_must_exist

  private

  attr_accessor :attend_request

  def leader_cant_attend
    if trip.creator.id == user_id
      errors.add(:you, "are already leading this trip")
      throw :abort
    end
  end

  def attend_request_must_exist
    self.attend_request = AttendRequest.find_by(user: user, trip: trip)
    unless attend_request
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

  def destroy_attend_request!
    attend_request.destroy!
  end
end
