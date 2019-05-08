class Api::TripsController < ApplicationController
  before_action :set_trip_for_current_user, only: [:update, :destroy]

  def create
    @trip = current_user.created_trips.build(trip_params)
    if @trip.save
      render :show
    else
      render json: @trip.errors.full_messages, status: 422
    end
  end

  def show
    @trip = Trip.find(params[:id])
  end

  def update
    if @trip.update(trip_params)
      render :show
    else
      render json: @trip.errors.full_messages, status: 422
    end
  end

  def index
    @trips = Trip.all.includes(:creator)
  end

  def destroy
    if @trip.destroy
      render :show
    else
      render json: @trip.errors.full_messages, status: 422
    end
  end

  private

  def set_trip_for_current_user
    # TODO: add includes for creator/leader?
    @trip = current_user.created_trips.find(params[:id])
  end

  def trip_params
    params.require(:trip).permit(
      :start_date,
      :end_date,
      :location,
      :title,
      :cover_photo,
      :spaces,
      :privacy
    )
  end
end
