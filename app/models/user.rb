# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#

class User < ApplicationRecord
  include BCrypt

  has_one_attached :profile_picture

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user if user.try(:password?, password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  attr_reader :password

  before_destroy :destroy_friend_records

  has_many :friend_requests,
           foreign_key: :requestee_id,
           dependent: :destroy
  has_many :requested_friends,
           foreign_key: :requester_id,
           class_name: :FriendRequest,
           dependent: :destroy
  has_many :created_trips,
           foreign_key: :creator_id,
           class_name: :Trip,
           dependent: :destroy
  has_many :attend_requests,
           dependent: :destroy
  has_many :managed_attend_requests,
           through: :created_trips,
           source: :attend_requests,
           dependent: :destroy
  has_many :managed_messages,
           through: :created_trips,
           source: :messages
  has_many :attendances,
           dependent: :destroy
  has_many :attended_trips,
           through: :attendances,
           source: :trip
  has_many :managed_attendances,
           through: :created_trips,
           source: :attendances
  has_many :messages,
           dependent: :destroy

  validates :first_name, :last_name, :email,
            :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  after_initialize :ensure_session_token

  def friends_trips
    Trip.where(creator: friend_ids)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def password?(password)
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

  def full_name
    "#{first_name} #{last_name}"
  end

  def friend_records
    query = "friend_one_id = :id OR friend_two_id = :id"
    Friend.where(query, id: id)
  end

  def friend_ids
    friend_records.
      pluck(:friend_one_id, :friend_two_id).
      flatten.
      reject { |i| i == id }
  end

  def friends_with?(other_user)
    friend_ids.include?(other_user.id)
  end

  def friends
    User.where(id: friend_ids)
  end

  private

  def destroy_friend_records
    friend_records.destroy_all
  end
end
