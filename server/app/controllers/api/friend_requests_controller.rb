class Api::FriendRequestsController < ApplicationController
  before_action :ensure_authorized_delete, only: :destroy

  def create
    @friend_request = current_user.requested_friends.build(requestee_id: params[:id])
    if @friend_request.save
      render :show
    else
      render json: @friend_request.errors.full_messages
    end
  end

  def index
    @friend_requests = current_user.friend_requests + current_user.requested_friends
  end

  def destroy
    @friend_request = FriendRequest.find(params[:id])
    @friend_request.destroy
    render :show
  end

  private

  def ensure_authorized_delete
    @friend_request = FriendRequest.find(params[:id])
    unless (current_user.id == @friend_request.requestee_id || 
            current_user.id == @friend_request.requester_id)
      render json: {messages: "Not authorized"}, status: 500
    end
  end
end
