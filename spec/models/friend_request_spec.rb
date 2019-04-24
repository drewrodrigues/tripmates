require 'rails_helper'

RSpec.describe FriendRequest, type: :model do
  subject(:friend_request) { build_stubbed(:friend_request) }
  
  describe "associations" do
    it { is_expected.to belong_to(:requester) }
    it { is_expected.to belong_to(:requestee) }
  end

  describe "validations" do
    it "has a valid factory" do
      expect(friend_request).to be_valid
    end

    describe "#unique_friend_request_between_users" do
      context "when no friend request exists" do
        it "is valid" do
          user_1 = create(:user)
          user_2 = create(:user)
          new_friend_request = create(
            :friend_request,
            requestee: user_1,
            requester: user_2
          )

          expect(new_friend_request).to_not be_valid
        end
      end

      context "when friend request exists already" do
        it "is invalid" do
          user_1 = create(:user)
          user_2 = create(:user)
          existing_friend_request = create(
            :friend_request,
            requestee: user_1,
            requester: user_2
          )
          duplicate_friend_request = build(
            :friend_request,
            requestee: user_1,
            requester: user_2
          )

          expect(duplicate_friend_request).to_not be_valid
        end

        it "is handles requests both ways" do
          user_1 = create(:user)
          user_2 = create(:user)
          existing_friend_request = create(
            :friend_request,
            requestee: user_1,
            requester: user_2
          )
          duplicate_friend_request = build(
            :friend_request,
            requestee: user_1,
            requester: user_2
          )
          duplicate_friend_request2 = build(
            :friend_request,
            requestee: user_2,
            requester: user_1
          )

          [duplicate_friend_request, duplicate_friend_request2].each do |req|
            expect(req).to_not be_valid
          end
        end
      end
    end

    describe "#cant_request_self" do
      context "when attempting to request self" do
        it "is invalid" do
          friend_request = build(
            :friend_request,
            requester_id: 5,
            requestee_id: 5
          )
          expect(friend_request).to_not be_valid
        end
      end
    end
  end
end
