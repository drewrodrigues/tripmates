# == Schema Information
#
# Table name: attendances
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  trip_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_attendances_on_user_id_and_trip_id  (user_id,trip_id) UNIQUE
#

require 'rails_helper'

RSpec.describe Attendance, type: :model do
  let(:setup) do
    create(:user)
    create(:user)
    FriendRequest.create(requester: User.first, requestee: User.last)
    Friend.create(friend_one_id: User.first.id, friend_two_id: User.last.id)
    create(:trip, creator: User.first)
  end

  it "has a trip" do
    trip = Trip.first
    attendance = Attendance.new(user: User.last, trip: trip)
    expect(attendance.trip).to eq(trip)
  end

  it "has a user" do
    user = User.last
    attendance = Attendance.new(user: user, trip: Trip.first)
    expect(attendance.user).to eq(user)
  end

  describe "validations" do
    context "when attend_request exists" do
      before do
        setup
        AttendRequest.create(user: User.last, trip: Trip.first)
        @attendance = Attendance.new(user: User.last, trip: Trip.first)
      end

      it "is valid" do
        expect(@attendance).to be_valid
      end

      it "is valid after creation" do
        @attendance.save
        expect(Attendance.last).to be_valid
      end
    end

    context "when no attend_request exists" do
      before do
        setup
        @attendance = Attendance.new(user: User.last, trip: Trip.first)
      end

      it "is invalid" do
        expect(@attendance).to be_invalid
      end

      it "has an error" do
        @attendance.validate
        expect(@attendance.errors.full_messages).to eq(['Attend request must be made first'])
      end
    end

    context "when user is leader" do
      before do
        setup
        @attendance = Attendance.new(user: User.first, trip: Trip.last)
      end

      it "is invalid" do
        expect(@attendance).to be_invalid
      end

      it "has errors" do
        @attendance.validate
        expect(@attendance.errors.full_messages).to eq(["You are already leading this trip"])
      end
    end

    context "when attendance already exists" do
      before do
        setup
        AttendRequest.create(user: User.last, trip: Trip.first)
        Attendance.create(user: User.last, trip: Trip.first)
        @attendance = Attendance.new(user: User.last, trip: Trip.first)
      end

      it "is invalid" do
        expect(@attendance).to be_invalid
      end

      it "has an error" do
        @attendance.validate
        expect(@attendance.errors.full_messages).to eq(["You are already attending this trip"])
      end
    end
  end
end
