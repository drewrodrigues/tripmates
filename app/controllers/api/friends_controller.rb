class Api::FriendsController < ApplicationController
  before_action :require_sign_in

  def create
    friend_request = current_user.friend_requests.find(params[:id])
    @friend_record = Friend.new(
      friend_one_id: current_user.id,
      friend_two_id: friend_request.requester_id,
    )
    if @friend_record.save
      @friend = @friend_record.other_user(current_user)
      render :show
    else
      render json:
        { errors: @friend_record.errors.full_messages },
             status: 422
    end
  end

  def index
    @friend_records = current_user.friend_records
    @friends = current_user.friends
  end

  def destroy
    friend = Friend.find(params[:id])
    friend.destroy
    render json: {}, status: :ok
  end
end
