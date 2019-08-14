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

require "rails_helper"

RSpec.describe FriendRequest, type: :model do
  describe "validations" do
    it "doesn't allow a user to add themself" do
      friend_request = FriendRequest.new(requester_id: 1, requestee_id: 1)
      expect(friend_request).to_not be_valid
    end

    it "doesn't allow adding duplicate requests" do
      user1 = build_stubbed(:user)
      user2 = build_stubbed(:user)
      FriendRequest.create(requester: user1, requestee: user2)

      expect {
        request = FriendRequest.create(requester: user1, requestee: user2)
        expect(request).to_not be_valid
        expect(request.errors.full_messages).to eq(["Friend request already exists"])
      }.to_not change(FriendRequest, :count)
    end
  end

  describe "#already_sent?" do
    context "when requestee hasn't sent an invite" do
      it "returns false" do
        user1 = create(:user)
        user2 = create(:user)

        new_request = FriendRequest.new(requestee: user1, requester: user2)

        expect(new_request.already_sent?).to be false
      end
    end

    context "when requestee has sent an invite" do
      it "returns false" do
        user1 = create(:user)
        user2 = create(:user)

        FriendRequest.create(requestee: user1, requester: user2)
        repeated_request = FriendRequest.new(requestee: user1, requester: user2)

        expect(repeated_request.already_sent?).to be true
      end
    end
  end

  describe "#already_being_requested?" do
    context "when requester doesn't have a friend request pending" do
      it "returns false" do
        user1 = create(:user)
        user2 = create(:user)

        new_request = FriendRequest.new(requester: user1, requestee: user2)

        expect(new_request.already_being_requested?).to be false
      end
    end

    context "when requester has a friend request pending" do
      it "returns true" do
        user1 = create(:user)
        user2 = create(:user)

        FriendRequest.create(requestee: user1, requester: user2)
        repeated_request = FriendRequest.new(requester: user1, requestee: user2)

        expect(repeated_request.already_being_requested?).to be true
      end
    end
  end
end