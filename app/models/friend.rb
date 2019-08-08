# == Schema Information
#
# Table name: friends
#
#  id            :bigint           not null, primary key
#  friend_one_id :integer          not null
#  friend_two_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

# Connects users between each other
# ====
# Controller handles ensuring accepting a friend is made by the
# requestee only since it knows about the current user
# - users must exist
# - friends must not already exist
# - friend request must exist first
class Friend < ApplicationRecord
  before_create :ensure_can_create

  after_initialize :set_friend_request
  attr_reader :friend_request
  attr_reader :friend_users

  def other_user(current_user)
    friend_users.where(id: other_user_id(current_user)).first
  end

  private

  attr_writer :friend_request, :friend_users

  def ensure_can_create
    if users_dont_exist?
      errors.add(:user, "doesn't exist")
    elsif friends_exist?
      errors.add(:friend, "already added")
    elsif no_friend_request?
      errors.add(:friend_request, "not found")
    end

    throw :abort if errors.any?
  end

  def friends_exist?
    query = <<~SQL
      (friend_one_id = :friend_one_id OR friend_two_id = :friend_one_id) AND
      (friend_one_id = :friend_two_id OR friend_two_id = :friend_two_id)
    SQL
    Friend.where(
      query,
      friend_one_id: friend_one_id,
      friend_two_id: friend_two_id
    ).exists?
  end

  def users_dont_exist?
    self.friend_users = User.where(id: [friend_one_id, friend_two_id])
    friend_users.count != 2
  end

  def no_friend_request?
    !self.friend_request
  end

  def set_friend_request
    query = <<~SQL
      (requestee_id = :friend_one_id OR requester_id = :friend_one_id) AND
      (requestee_id = :friend_two_id OR requester_id = :friend_two_id)
    SQL
    self.friend_request = FriendRequest.where(
      query,
      friend_one_id: friend_one_id,
      friend_two_id: friend_two_id
    ).first
  end

  def other_user_id(current_user)
    current_user.id == friend_one_id ? friend_two_id : friend_one_id
  end
end
