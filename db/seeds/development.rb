require 'faker'

ActiveRecord::Base.transaction do
  SEED_DATA_PATH = "app/assets/seed_data/"

  drew = User.new(
    first_name: "Drew",
    last_name: "Rodrigues",
    email: "drew@tripmates.io",
    password: "password"
  )
  drew.profile_picture.attach(
    io: File.open(SEED_DATA_PATH + "users/" + "me.jpeg"),
    filename: "me"
  )
  drew.save!

  users = [
    {
      first_name: "Aaron",
      last_name: "Waugh",
      profile_picture: SEED_DATA_PATH + "users/" + "aaron.jpg"
    },
    {
      first_name: "Alisha",
      last_name: "Rodrigues",
      profile_picture: SEED_DATA_PATH + "users/" + "alisha.jpg"
    },
    {
      first_name: "Billie",
      last_name: "Zoller",
      profile_picture: SEED_DATA_PATH + "users/" + "billie.jpg"
    },
    {
      first_name: "David",
      last_name: "Larson",
      profile_picture: SEED_DATA_PATH + "users/" + "david.jpg"
    },
    {
      first_name: "Desiree",
      last_name: "Rodrigues",
      profile_picture: SEED_DATA_PATH + "users/" + "desiree.jpg"
    },
    {
      first_name: "Justin",
      last_name: "Perry",
      profile_picture: SEED_DATA_PATH + "users/" + "justin.jpg"
    },
    {
      first_name: "Ken",
      last_name: "O'Campo",
      profile_picture: SEED_DATA_PATH + "users/" + "ken.jpg"
    },
    {
      first_name: "Nathalie",
      last_name: "Lopez",
      profile_picture: SEED_DATA_PATH + "users/" + "nathalie.jpg"
    },
    {
      first_name: "Nikkol",
      last_name: "Vile",
      profile_picture: SEED_DATA_PATH + "users/" + "nikkol.jpg"
    },
    {
      first_name: "Temesgen",
      last_name: "Fekadu",
      profile_picture: SEED_DATA_PATH + "users/" + "tdog.jpg"
    }
  ]

  users.each do |user|
    new_user = User.new(
      first_name: user[:first_name],
      last_name: user[:last_name],
      email: "#{user[:first_name]}@tripmates.io",
      password: "password"
    )
    new_user.profile_picture.attach(
      io: File.open(user[:profile_picture]),
      filename: user[:profile_picture]
    )
    new_user.save!
  end

  100.times do
    FriendRequest.create(
      requester: User.all.sample,
      requestee: User.all.sample
    )
  end

  user_ids = User.ids
  100.times do
    Friend.create(
      friend_one_id: user_ids.sample,
      friend_two_id: user_ids.sample
    )
  end

  trips = [
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "backpacking.jpg",
      title: "Backpacking",
      location: "Europe"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "beach_day.jpg",
      title: "Beach Day",
      location: "Santa Cruz, California"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "camping.jpeg",
      title: "Camping",
      location: "Camping"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "camping.jpeg",
      title: "Camping",
      location: "Camping"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "clubbing.jpeg",
      title: "Clubbing",
      location: "Miami, Florida"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "cross_country_biking.jpg",
      title: "Cross Country Ride",
      location: "United States"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "cruise.jpg",
      title: "Cruise",
      location: "Mexico"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "hike.jpg",
      title: "Hike",
      location: "Yosemite, California"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "peru.jpg",
      title: "Machu Picchu",
      location: "Peru"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "rafting.jpg",
      title: "White Water Rafting",
      location: "Sacremento, California"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "rails_conf.png",
      title: "Rails Conference",
      location: "Pheonix, Arizona"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "roadtrip_2.jpg",
      title: "Road Trip",
      location: "Portland, Oregon"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "roadtrip.jpg",
      title: "Road Trip",
      location: "Austin, Texas"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "sky_diving.jpg",
      title: "Sky Diving",
      location: "Davis, California"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "snowboarding.jpg",
      title: "Snowboarding",
      location: "Lake Tahoe, California"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "tahoe.jpg",
      title: "Weekend in Tahoe",
      location: "Lake Tahoe, California"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "train.jpg",
      title: "Train Trip",
      location: "Chicago, California"
    },
    {
      cover_photo: SEED_DATA_PATH + "trips/" + "wilderness.jpg",
      title: "Wilderness Backpacking",
      location: "Yosemite, California"
    },
    {
        cover_photo: SEED_DATA_PATH + "trips/" + "florida.jpeg",
        title: "Christmas at Desiree's",
        location: "Largo, Florida"
    },
    {
        cover_photo: SEED_DATA_PATH + "trips/" + "wilderness.jpg",
        title: "Wilderness Backpacking",
        location: "Yosemite, California"
    },
    {
        cover_photo: SEED_DATA_PATH + "trips/" + "europe.jpg",
        title: "Backpacking",
        location: "Europe"
    },
    {
        cover_photo: SEED_DATA_PATH + "trips/" + "scuba.jpg",
        title: "Scuba Diving",
        location: "New Zealand"
    },
    {
        cover_photo: SEED_DATA_PATH + "trips/" + "snorkel.jpg",
        title: "Snorkeling",
        location: "Cancun, Mexico"
    }
  ]

  trips.each do |trip|
    start_date = Faker::Time.between(from: 20.days.from_now, to: 2.years.from_now)
    new_trip = Trip.new(
      creator_id: user_ids.sample,
      details: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
      end_date: Faker::Time.between(from: start_date, to: start_date + 10.days),
      location: trip[:location],
      spaces: (2..10).to_a.sample,
      start_date: start_date,
      title: trip[:title]
    )
    new_trip.cover_photo.attach(
      io: File.open(trip[:cover_photo]),
      filename: trip[:cover_photo]
    )
    new_trip.save!
  end

  User.all.each do |user|
    friends = user.friends
    friends.each do |users_friend|
      friends_trips = users_friend.created_trips

      friends_trips.each do |trip|
        next if rand(3) == 1

        AttendRequest.create!(user: user, trip: trip)

        next if rand(2) == 1
        Attendance.create!(user: user, trip: trip)
      end
    end
  end

  puts "#{User.count} Users created"
  puts "#{FriendRequest.count} FriendRequests created"
  puts "#{Friend.count} Friends created"
  puts "#{Trip.count} Trips created"
  puts "#{AttendRequest.count} AttendRequest created"
  puts "#{Attendance.count} Attendance created"
end