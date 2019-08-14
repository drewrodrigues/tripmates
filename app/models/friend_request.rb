# == Schema Information
#
# Table name: friend_requests
#
#  id           :bigint           not null, primary key
#  requester_id :integer          not null
#  requestee_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_friend_requests_on_requester_id_and_requestee_id  (requester_id,requestee_id)
#

class FriendRequest < ApplicationRecord
  belongs_to :requester,
    class_name: :User
  belongs_to :requestee,
    class_name: :User

  validate :unique_friend_request_between_users
  validate :cant_request_self
  validate :friends_dont_exist

  def already_sent?
    FriendRequest.where(requester_id: requester_id).exists?
  end

  def already_being_requested?
    FriendRequest.where(requestee_id: requester_id).exists?
  end

  # TODO:
  def delete_and_add_friend
    # Friend
  end

  private

  def unique_friend_request_between_users
    user1, user2 = [requester_id, requestee_id].sort
    if FriendRequest.where(requestee_id: user1, requester_id: user2)
                    .or(FriendRequest.where(requestee_id: user2, requester_id: user1))
                    .exists?
      errors.add(:friend_request, "already exists")
    end
  end

  def cant_request_self
    if [requester_id, requestee_id].uniq.length == 1
      errors.add(:friend_request, "can't request self")
    end
  end

  def friends_dont_exist
    query = <<~SQL
      (friend_one_id = :friend_one_id OR friend_two_id = :friend_one_id) AND
      (friend_one_id = :friend_two_id OR friend_two_id = :friend_two_id)
    SQL
    friend_record = Friend.where(
      query,
      friend_one_id: requester_id,
      friend_two_id: requestee_id
    ).exists?
    errors.add(:friend, "already added") if friend_record
  end
end
