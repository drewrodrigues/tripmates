class Api::TripsController < ApplicationController
  before_action :set_trip, only: [:show, :destroy]

  def create
    @trip = Trip.new(trip_params)
    if @trip.save
      render @trip
    else
      render json: @trip.errors.full_messages, status: 422
    end
  end
  
  def show
    @trip = Trip.find(params[:id])
  end

  def update
  end

  def index
    @trips = Trip.find_by(creator_id: params[:user_id])
  end

  def destroy
    @trip.destroy
  end

  private

  def set_trip
    @trip = Trip.find(params[:id])
  end

  def trip_params
    params.require(:trip).permit(:start_date, :end_date, :location, :creator_id, 
                                 :title)
  end
end
