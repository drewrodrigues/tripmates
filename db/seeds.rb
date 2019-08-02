User.destroy_all
Trip.destroy_all

load(Rails.root.join('db', 'seeds', "#{Rails.env.downcase}.rb"))