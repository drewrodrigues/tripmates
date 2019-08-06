json.set! user.id do
  json.extract! user, :first_name, :last_name, :email, :id, :full_name
  json.profile_picture url_for(user.profile_picture) if user.profile_picture.attached?
end