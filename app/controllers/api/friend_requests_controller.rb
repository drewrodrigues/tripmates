class Api::FriendRequestsController < ApplicationController
  before_action :ensure_authorized_delete, only: :destroy

  def create
    @friend_request = current_user.requested_friends.build(requestee_id: params[:id])
    if @friend_request.save
      render :show
    elsif @friend_request.already_sent?
      @friend_request = current_user.requested_friends.where(requestee_id: params[:id])
      render :show
    elsif @friend_request.already_being_requested?
      # TODO: @friend_request.delete_and_add_friend
    else
      render json: @friend_request.errors.full_messages
    end
  end

  def index
    @friend_requests = current_user.friend_requests + current_user.requested_friends
  end

  def destroy
    @friend_request&.destroy
    render json: {}, status: :ok
  end

  private

  def ensure_authorized_delete
    @friend_request = FriendRequest.find_by(id: params[:id])
    return unless @friend_request
    unless current_user.id == @friend_request.requestee_id ||
            current_user.id == @friend_request.requester_id
      render json: {messages: "Not authorized"}, status: 500
    end
  end
end
