ActiveRecord::Base.transaction do
  drew = User.create!(first_name: "Drew",
                      last_name:  "Rodrigues",
                      email:      "thesimpledev@gmail.com",
                      password:   "password");
end