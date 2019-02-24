# == Schema Information
#
# Table name: friend_requests
#
#  id           :bigint(8)        not null, primary key
#  requester_id :integer          not null
#  requestee_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class FriendRequest < ApplicationRecord
  belongs_to :requester,
    class_name: :User
  belongs_to :requestee,
    class_name: :User
end
