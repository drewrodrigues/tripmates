class Api::TripsController < ApplicationController
  before_action :require_sign_in
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
    if params[:when] == "past"
      @trips = Trip.where("start_date < ?", params[:date].to_date).includes(:creator)
    elsif params[:when] == "upcoming"
      @trips = Trip.where("start_date >= ?", params[:date].to_date).includes(:creator)
    else
      @trips = Trip.all.includes(:creator)
    end
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
    base_params = [
      :details,
      :end_date,
      :location,
      :privacy,
      :spaces,
      :start_date,
      :title
    ]
    cover_photo_param = params[:trip][:cover_photo]
    if cover_photo_param == "" || cover_photo_param.is_a?(String)
      params.require(:trip).permit(*base_params)
    else
      params.require(:trip).permit(*base_params, :cover_photo)
    end
  end
end
