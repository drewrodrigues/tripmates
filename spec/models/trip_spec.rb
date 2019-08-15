# == Schema Information
#
# Table name: trips
#
#  id         :bigint           not null, primary key
#  start_date :date             not null
#  end_date   :date             not null
#  title      :string           not null
#  location   :string
#  creator_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  spaces     :integer          not null
#  privacy    :integer          default("visible"), not null
#  details    :text             default(""), not null
#
# Indexes
#
#  index_trips_on_creator_id  (creator_id)
#  index_trips_on_privacy     (privacy)
#  index_trips_on_title       (title)
#

require "rails_helper"
require "timecop"

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
    it { is_expected.to validate_presence_of(:spaces) }
    it { is_expected.to validate_presence_of(:privacy) }

    it { is_expected.to define_enum_for(:privacy).with(Trip::PRIVACIES) }

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

    describe "#positive_spaces" do
      context "when zero" do
        it "is valid" do
          trip = build(:trip, spaces: 0)
          expect(trip).to be_valid
        end
      end

      context "when positive" do
        it "is valid" do
          trip = build(:trip, spaces: 1)
          expect(trip).to be_valid
        end
      end

      context "when negative" do
        it "is invalid" do
          trip = build(:trip, spaces: -1)
          expect(trip).to_not be_valid
        end
      end
    end
  end

  describe "defaults" do
    describe "#privacy" do
      it "defaults to 'visible'" do
        expect(Trip.new.privacy).to eq("visible")
      end
    end
  end

  describe "#duration" do
    # TODO: make this computed on front end
    it "accounts for the start day" do
      trip = build(:trip, start_date: Date.today, end_date: Date.today)
      expect(trip.duration).to eq(1)
    end
  end
end
