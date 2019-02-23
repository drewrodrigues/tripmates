json.set! user.id do
  json.extract! user, :first_name, :last_name, :email, :id
  json.fullName "#{user.first_name} #{user.last_name}"
end