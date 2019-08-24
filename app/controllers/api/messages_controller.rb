class Api::MessagesController < ApplicationController
  before_action :require_sign_in
  before_action :set_trip, only: %i[create index]

  def create
    @message = Message.new(message_params)
    @message.trip = @trip
    @message.user = current_user
    if @message.save
      render :show
    else
      render json: {
        errors: ["Failed to create message"],
      }, status: :unprocessable_entity
    end
  end

  def index
    @messages = @trip.messages.includes(:user)
  end

  def destroy
    message = current_user.messages.find_by(id: params[:id]) ||
      current_user.managed_messages.find(params[:id])
    if message.destroy
      render json: {}, status: :ok
    else
      render json: {
        errors: ["Failed to delete message"],
      }, status: :bad_request
    end
  end

  private

  def set_trip
    @trip = current_user.created_trips.find_by(id: params[:trip_id]) ||
      current_user.attending_trips.find(params[:trip_id])
  end

  def message_params
    params.require(:message).permit(:body)
  end
end
