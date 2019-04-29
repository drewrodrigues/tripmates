FactoryBot.define do
  factory :user do
  end

  factory :trip do
    start_date { Date.today }
    end_date { Date.today + 1 }
    title { "Supai" }
    location { "Arizona" }
    spaces { 5 }
    privacy { Trip::PRIVACIES.sample }
    
    association :creator, factory: :user, strategy: :build
  end
end
