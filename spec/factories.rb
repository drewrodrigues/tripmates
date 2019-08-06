FactoryBot.define do
  factory :user do
    first_name { "Drew" }
    last_name { "Rodrigues" }
    sequence(:email) { |i| "example#{i}@tripmates.io" }
    password { "password" }
  end

  factory :trip do
    start_date { Date.today }
    end_date { Date.today + 1 }
    title { "Supai" }
    location { "Arizona" }
    spaces { 5 }
    privacy { Trip::PRIVACIES.sample }
    details { "Cool details go here" }

    association :creator, factory: :user, strategy: :build
  end
end
