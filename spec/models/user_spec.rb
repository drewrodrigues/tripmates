# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require "rails_helper"

RSpec.describe User, type: :model do
  describe "#friends_trips" do
    context "with trips from friends" do
      it "returns trips" do
        user = create(:user)
        other_user = create(:user)
        another_user = create(:user)
        non_friend_user = create(:user)
        FriendRequest.create(requester: user, requestee: other_user)
        Friend.create(friend_one_id: user.id, friend_two_id: other_user.id)
        FriendRequest.create(requester: user, requestee: another_user)
        Friend.create(friend_one_id: user.id, friend_two_id: another_user.id)

        non_friend_trip = create(:trip, creator: non_friend_user)
        trip_one = create(:trip, creator: other_user)
        trip_two = create(:trip, creator: another_user)
        expect(Trip.count).to eq(3)

        expect(user.friends_trips.count).to eq(2)
        expect(user.friends_trips).to include(trip_one)
        expect(user.friends_trips).to include(trip_two)
        expect(user.friends_trips).to_not include(non_friend_trip)
      end
    end

    context "With no trips from friends" do
      it "returns no trips" do
        user = create(:user)
        non_friend_user = create(:user)

        non_friend_trip = create(:trip, creator: non_friend_user)
        expect(Trip.count).to eq(1)

        expect(user.friends_trips.count).to eq(0)
      end
    end
  end

  describe "#friends_records" do
    it "returns all friend records" do
      user = create(:user)
      other_user = create(:user)
      FriendRequest.create(requestee: user, requester: other_user)
      Friend.create(friend_one_id: user.id, friend_two_id: other_user.id)

      friend = user.friend_records[0]
      friend_ids = [friend.friend_one_id, friend.friend_two_id]

      expect(user.friend_records.length).to eq(1)
      expect(friend_ids.include?(friend_ids[0])).to be true
      expect(friend_ids.include?(friend_ids[1])).to be true
    end

    context "when no friends" do
      it "returns no friend records" do
        user = create(:user)

        expect(user.friend_records).to be_empty
      end
    end
  end

  describe "#friend_ids" do
    context "with friends records" do
      it "returns their ids" do
        user = create(:user)
        other_user = create(:user)
        FriendRequest.create(requestee: user, requester: other_user)
        Friend.create(friend_one_id: user.id, friend_two_id: other_user.id)

        expect(user.friend_ids).to eq([other_user.id])
      end
    end

    context "with no friend records" do
      it "returns []" do
        user = create(:user)

        expect(user.friend_ids).to eq([])
      end
    end
  end

  describe "#friends" do
    it "returns all friends" do
      user = create(:user)
      other_user = create(:user)
      FriendRequest.create(requestee: user, requester: other_user)
      Friend.create(friend_one_id: user.id, friend_two_id: other_user.id)

      friends = user.friends
      expect(friends.include?(other_user)).to be true
      expect(friends.count).to eq(1)
    end

    context "when no friends" do
      it "returns no friends" do
        user = create(:user)

        expect(user.friends.count).to eq(0)
      end
    end
  end
end
