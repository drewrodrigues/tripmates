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

  validate :unique_friend_request_between_users

  private

  def unique_friend_request_between_users
    user1, user2 = [requester_id, requestee_id].sort
    byebug
    if FriendRequest.where(requestee_id: user1, requester_id: user2)
                    .or(FriendRequest.where(requestee_id: user2, requester_id: user1))
                    .exists?
      errors.add(:friend_request, "already exists")
    end
  end
end
