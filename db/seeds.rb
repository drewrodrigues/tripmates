User.destroy_all
Trip.destroy_all
FriendRequest.destroy_all
Friend.destroy_all
AttendRequest.destroy_all
Attendance.destroy_all

load(Rails.root.join('db', 'seeds', "#{Rails.env.downcase}.rb"))