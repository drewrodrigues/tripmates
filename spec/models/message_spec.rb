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

require 'rails_helper'

RSpec.describe Message, type: :model do
  it 'has a valid factory' do
    expect(build(:message)).to be_valid
  end

  it { should validate_presence_of(:body) }

  it { should belong_to(:trip) }
  it { should belong_to(:user) }
end
