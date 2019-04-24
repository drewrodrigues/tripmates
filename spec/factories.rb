FactoryBot.define do
  factory :user do
    sequence(:first_name) { |n| "somename#{n}" }
    sequence(:last_name) { |n| "somename#{n}" }
    sequence(:email) { |n| "someemail#{n}@gmail.com" }
    sequence(:password) { "password" }
  end

  factory :trip do
    start_date { Date.today }
    end_date { Date.today + 1 }
    title { "Supai" }
    location { "Arizona" }
    
    association :creator, factory: :user, strategy: :build
  end

  factory :friend_request do
    association :requester, factory: :user, strategy: :build_stubbed
    association :requestee, factory: :user, strategy: :build_stubbed
  end
end
