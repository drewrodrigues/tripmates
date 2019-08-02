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
end