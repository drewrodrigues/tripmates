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
  validates :title, uniqueness: { scope: :creator }

  # TODO: add validation start_date <= end_date
end
