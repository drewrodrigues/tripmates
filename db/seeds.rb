User.destroy_all
Trip.destroy_all

ActiveRecord::Base.transaction do
  drew = User.create!(first_name: "Drew",
                       last_name: "Rodrigues",
                           email: "thesimpledev@gmail.com",
                        password: "password");
  
  supai = Trip.create!(start_date: Date.today, 
                         end_date: Date.today+3,
                         location: "Supai, Arizona",
                       creator_id: drew.id,
                            title: "Camping in Supai")
end