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
  belongs_to :creator,
    class_name: :User
  
  validates :start_date, :end_date, :title, presence: true

  # TODO: add validation start_date <= end_date

  def duration
    day_count = (end_date - start_date).round + 1
    "#{day_count} day" + (day_count > 1 ? "s" : "")
  end

  def days_until
    day_count = (start_date - Date.today).round
    "#{day_count} day" + (day_count > 1 ? "s" : "") + " until"
  end
end
