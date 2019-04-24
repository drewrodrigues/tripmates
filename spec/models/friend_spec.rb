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

require 'rails_helper'

RSpec.describe Friend, type: :model do
  subject(:friend) { build_stubbed(:friend) }

  describe "assocations" do
    it { is_expected.to belong_to(:user_one) }
    it { is_expected.to belong_to(:user_two) }
  end

  describe "validations" do
    it "has a valid factory" do
      expect(friend).to be_valid
    end

    it "only allows a unique pair of friends" do
      user_one = create(:user)
      user_two = create(:user)
      friend_pair = create(
        :friend,
        user_one: user_one,
        user_two: user_two
      )
      duplicate_friend_pair = build(
        :friend,
        user_one: user_one,
        user_two: user_two
      )

      expect(duplicate_friend_pair).to_not be_valid
    end

    it "handles friends both ways" do
      user_one = create(:user)
      user_two = create(:user)
      friend_pair = create(
        :friend,
        user_one: user_one,
        user_two: user_two
      )
      duplicate_friend_pair = build(
        :friend,
        user_one: user_one,
        user_two: user_two
      )
      duplicate_friend_pair2 = build(
        :friend,
        user_one: user_two,
        user_two: user_one
      )

      [duplicate_friend_pair, duplicate_friend_pair2].each do |pair|
        expect(pair).to_not be_valid
      end
    end
  end
end
