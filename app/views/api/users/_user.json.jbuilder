json.set! user.id do
  json.extract! user, :first_name, :last_name, :email, :id, :full_name
  if user.profile_picture.attached?
    json.profile_picture url_for(user.profile_picture)
  end
end
