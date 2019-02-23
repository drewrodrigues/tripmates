require 'faker'

User.destroy_all
Trip.destroy_all

ActiveRecord::Base.transaction do
  drew = User.create!(
    first_name: "Drew",
    last_name: "Rodrigues",
    email: "thesimpledev@gmail.com",
    password: "password"
  )

  10.times do
    User.create!(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.email,
      password: "password"
    )
  end

  user_ids = User.ids

  200.times do |i|
    start_date = Faker::Time.between(20.days.from_now, 2.years.from_now)
    supai = Trip.create!(
      start_date: start_date,
      end_date: Faker::Time.between(start_date, start_date + 10.days),
      location: Faker::Nation.capital_city,
      creator_id: user_ids.sample,
      title: Faker::Marketing.buzzwords.titleize,
      image_url: "https://picsum.photos/420/320?image=#{i + 10}"
    )
  end
end