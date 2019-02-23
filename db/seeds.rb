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

  100.times do |i|
    supai = Trip.create!(
      start_date: Date.today, 
      end_date: Date.today+3,
      location: Faker::Nation.capital_city,
      creator_id: user_ids.sample,
      title: "Camping in Supai",
      image_url: "https://picsum.photos/420/320?image=#{i + 10}"
    )
  end
end