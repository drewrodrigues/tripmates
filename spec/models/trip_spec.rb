# == Schema Information
#
# Table name: trips
#
#  id         :bigint(8)        not null, primary key
#  start_date :date             not null
#  end_date   :date             not null
#  title      :string           not null
#  location   :string
#  creator_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require "rails_helper"

RSpec.describe Trip, type: :model do
  subject(:trip) { build(:trip) }

  describe "associations" do
    it { is_expected.to belong_to(:creator) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:start_date) }
    it { is_expected.to validate_presence_of(:end_date) }
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:location) }

    it "has a valid factory" do
      expect(build(:trip)).to be_valid
    end

    describe "#valid_date_range" do
      context "when start date before end date" do
        it "is valid" do
          trip = build(:trip, start_date: Date.today, end_date: Date.today + 1)
          expect(trip).to be_valid
        end
      end

      context "when start date after end date" do
        it "is invalid" do
          trip = build(:trip, start_date: Date.today, end_date: Date.today - 2)
          expect(trip).to be_invalid
        end
      end

      context "when start and end date the same" do
        it "is valid" do
          trip = build(:trip, start_date: Date.today, end_date: Date.today)
          expect(trip).to be_valid
        end
      end
    end
  end

  describe "#duration" do
    it "accounts for the start day" do
      trip = build(:trip, start_date: Date.today, end_date: Date.today)
      expect(trip.duration).to eq(1)
    end
  end

  describe "#days_until" do
    it "accounts for the current user's timezone"

    context "when start date is today" do
      it "returns 0" do
        trip = build(:trip, start_date: Date.today, end_date: Date.today)
        expect(trip.days_until).to eq(0)
      end
    end

    context "when start date is in past" do
      it "returns a negative number" do
        past_day = Timecop.freeze(2019, 1, 1)
        trip = build(:trip, start_date: Date.today, end_date: Date.today)
        future_day = Date.new(2019, 6, 1)
        Timecop.travel(future_day)

        expect(trip.days_until).to be_negative
      end
    end
  end
end
