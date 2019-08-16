# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  user_id    :integer          not null
#  trip_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_messages_on_trip_id  (trip_id)
#  index_messages_on_user_id  (user_id)
#

require "rails_helper"

RSpec.describe Message, type: :model do
  it { should validate_presence_of(:body) }

  it { should belong_to(:trip) }
  it { should belong_to(:user) }

  describe "validations" do
    before do
      create(:trip)
    end

    context "when user is leader of trip" do
      it "is valid" do
        message = build(:message, user: User.first, trip: Trip.last)
        expect(message).to be_valid
      end
    end

    context "when user is attendee of trip" do
      it "is valid" do
        attendee = create(:user)
        leader = User.first
        trip = Trip.last
        FriendRequest.create!(requestee: attendee, requester: leader)
        Friend.create!(friend_one_id: attendee.id, friend_two_id: leader.id)
        AttendRequest.create!(trip: trip, user: attendee)
        Attendance.create!(trip: trip, user: attendee)

        message = build(:message, user: attendee, trip: trip)

        expect(message).to be_valid
      end
    end

    context "when user not attendee" do
      before do
        @message = build(:message, user: create(:user), trip: Trip.last)
      end

      it "is invalid" do
        expect(@message).to be_invalid
      end

      it "has errors" do
        @message.validate
        expect(@message.errors.full_messages).to eq(
         ["You must be on the trip to message"]
        )
      end
    end
  end
end
