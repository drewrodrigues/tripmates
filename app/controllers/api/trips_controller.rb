class Api::TripsController < ApplicationController
  before_action :set_trip, only: [:show, :destroy, :update]

  def create
    @trip = Trip.new(trip_params)
    @trip.creator_id = current_user.id
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
    @trips = current_user.trips.includes(:creator)
  end

  def destroy
    if @trip.destroy
      render :show
    else
      render json: @trip.errors.full_messages, status: 422
    end
  end

  private

  def set_trip
    @trip = Trip.find(params[:id])
  end

  def trip_params
    params.require(:trip).permit(:start_date, :end_date, :location, :creator_id, 
                                 :title, :image_url)
  end
end
