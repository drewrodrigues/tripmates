# == Schema Information
#
# Table name: friends
#
#  id          :bigint(8)        not null, primary key
#  user_one_id :integer          not null
#  user_two_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Friend < ApplicationRecord
  belongs_to :user_one,
    class_name: :User
  belongs_to :user_two,
    class_name: :User

  validate :unique_friend_pair

  private

  def unique_friend_pair
    return if [user_one_id, user_two_id].any?(&:nil?) # FIXME: better way to do this?
    user1, user2 = [user_one_id, user_two_id].sort
    if Friend.where(user_one: user1, user_two: user2)
             .or(Friend.where(user_two: user1, user_one: user2))
             .exists?
      errors.add(:friend, "is already added")
    end
  end
end
