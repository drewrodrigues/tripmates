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

  validates :body, presence: true
end
