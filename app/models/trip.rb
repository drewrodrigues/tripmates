# == Schema Information
#
# Table name: trips
#
#  id         :bigint(8)        not null, primary key
#  start_date :date             not null
#  end_date   :date             not null
#  image_url  :string
#  title      :string           not null
#  location   :string
#  creator_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Trip < ApplicationRecord
  belongs_to :creator, class_name: :User
  has_one_attached :cover_photo
  
  validates :start_date, :end_date, :title, :location, presence: true
  validate :valid_date_range

  def duration
    (end_date - start_date).round + 1
  end

  def days_until
    (start_date - Date.today).round
  end

  def valid_date_range
    return if [start_date, end_date].any?(&:nil?)
    if start_date > end_date
      errors.add(:start_date, "must be before or the same as end date.")
    end
  end
end
