require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:friend_requests) }
    it { is_expected.to have_many(:requested_friends) }
    it { is_expected.to have_many(:trips) }
  end
end
