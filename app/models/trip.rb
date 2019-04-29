# == Schema Information
#
# Table name: trips
#
#  id         :bigint(8)        not null, primary key
#  start_date :date             not null
#  end_date   :date             not null
#  title      :string           not null
#  location   :string
#  creator_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  spaces     :integer          not null
#  privacy    :integer          default("visible"), not null
#

class Trip < ApplicationRecord
  PRIVACIES = %w(visible hidden)

  belongs_to :creator, class_name: :User
  has_one_attached :cover_photo

  enum privacy: PRIVACIES
  
  validates :start_date, :end_date, :title, :location, :spaces, :privacy,
    presence: true
  validates :privacy, inclusion: { in: PRIVACIES }
  validate :valid_date_range
  validate :positive_spaces

  def duration
    (end_date - start_date).round + 1
  end

  def days_until
    (start_date - Date.today).round
  end

  def spaces_left
    return "Unlimited" if spaces.zero?
    spaces - 1
  end

  private

  def valid_date_range
    return if [start_date, end_date].any?(&:nil?)
    if start_date > end_date
      errors.add(:start_date, "must be before or the same as end date.")
    end
  end

  def positive_spaces
    errors.add(:spaces, 'must be positive') if spaces&.negative?
  end
end
