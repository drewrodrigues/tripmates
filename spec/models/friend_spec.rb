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
# Indexes
#
#  index_friends_on_friend_one_id_and_friend_two_id  (friend_one_id,friend_two_id)
#

require "rails_helper"

RSpec.describe Friend, type: :model do
  describe "validations" do
    context "when friend request exists" do
      context "and friend doesn't already exist" do
        it "creates the friend" do
          user_one = create(:user)
          user_two = create(:user)
          FriendRequest.create(requestee: user_one, requester: user_two)

          expect do
            Friend.create(
              friend_one_id: user_one.id,
              friend_two_id: user_two.id,
            )
          end.to change(Friend, :count).by(1)
        end

        it "destroys the friend request" do
          user_one = create(:user)
          user_two = create(:user)
          FriendRequest.create(requestee: user_one, requester: user_two)

          expect do
            Friend.create(
              friend_one_id: user_one.id,
              friend_two_id: user_two.id,
            )
          end.to change(FriendRequest, :count).by(-1)
        end
      end
    end

    context "when friends already exist" do
      before do
        @user_one = create(:user)
        @user_two = create(:user)
        FriendRequest.create(requestee: @user_one, requester: @user_two)

        Friend.create(
          friend_one_id: @user_one.id,
          friend_two_id: @user_two.id,
        )
      end

      it "doesn't add the friend" do
        expect do
          Friend.create(
            friend_one_id: @user_one.id,
            friend_two_id: @user_two.id,
          )
        end.to_not change(Friend, :count)
      end

      it "has errors" do
        friend = Friend.create(
          friend_one_id: @user_one.id,
          friend_two_id: @user_two.id,
        )

        expect(friend.errors.full_messages).to eq(["Friend already added"])
      end
    end

    context "when either user doesn't exist" do
      before do
        @user = create(:user)
      end

      it "doesn't add the friend" do
        expect do
          Friend.create(
            friend_one_id: @user.id,
            friend_two_id: 1_000_000,
          )
          Friend.create(
            friend_one_id: 1_000_000,
            friend_two_id: @user.id,
          )
        end.to_not change(Friend, :count)
      end

      it "has errors" do
        @friend_one = Friend.create(
          friend_one_id: @user.id,
          friend_two_id: 1_000_000,
        )
        @friend_two = Friend.create(
          friend_one_id: 1_000_000,
          friend_two_id: @user.id,
        )

        [@friend_one, @friend_two].each do |friend|
          expect(friend.errors.full_messages).to eq(["User doesn't exist"])
        end
      end
    end

    context "when friend request doesn't exist" do
      before do
        @user_one = create(:user)
        @user_two = create(:user)
      end

      it "doesn't add the friend" do
        expect do
          Friend.create(
            friend_one_id: @user_one.id,
            friend_two_id: @user_two.id,
          )
          Friend.create(
            friend_one_id: @user_two.id,
            friend_two_id: @user_one.id,
          )
        end.to_not change(Friend, :count)
      end

      it "has errors" do
        friend_one = Friend.create(
          friend_one_id: @user_one.id,
          friend_two_id: @user_two.id,
        )
        friend_two = Friend.create(
          friend_one_id: @user_two.id,
          friend_two_id: @user_one.id,
        )

        [friend_one, friend_two].each do |friend|
          expect(friend.errors.full_messages).to eq(["Friend request not found"])
        end
      end
    end

    context "on reload" do
      it "is valid" do
        user_one = create(:user)
        user_two = create(:user)
        FriendRequest.create(requestee: user_one, requester: user_two)

        Friend.create(friend_one_id: user_one.id, friend_two_id: user_two.id)

        expect(Friend.last).to be_valid
      end
    end
  end
end
