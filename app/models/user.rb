# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  include BCrypt

  has_one_attached :profile_picture

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user if user.try(:is_password?, password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  attr_reader :password

  has_many :friend_requests,
    foreign_key: :requestee_id
  has_many :requested_friends,
    foreign_key: :requester_id,
    class_name: :FriendRequest
  has_many :created_trips,
    foreign_key: :creator_id,
    class_name: :Trip

  validates :first_name, :last_name, :email,
            :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  after_initialize :ensure_session_token

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def is_password?(password)
    Password.new(password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    save
    session_token
  end
end
