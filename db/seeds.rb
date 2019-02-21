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

  new_york = Trip.create!(start_date: Date.today+10, 
                            end_date: Date.today+20,
                            location: "New York, New York",
                          creator_id: drew.id,
                               title: "Cross Country Train Trip")

  new_york = Trip.create!(start_date: Date.today+300, 
                            end_date: Date.today+305,
                            location: "Lake Tahoe, California",
                          creator_id: drew.id,
                               title: "Firewatch Tower")
end