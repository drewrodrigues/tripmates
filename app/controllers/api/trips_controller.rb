class Api::TripsController < ApplicationController
  before_action :require_sign_in
  before_action :set_trip_for_current_user, only: %i[update destroy]

  def create
    @trip = current_user.created_trips.build(trip_params)
    if @trip.save
      render :show
    else
      render json: @trip.errors.full_messages, status: 422
    end
  end

  # TODO: add edit so frontend can hit it, and we can scope from
  # current_user/resource a user can handle
  # otherwise it'll return a 404 and the frontend knows how to handle that
  # because otherwise we are hitting the #show, which is getting a lot of extra data

  def show
    @trip = Trip.includes(:creator, :attendances, :attend_requests).find(params[:id])
  end

  def update
    if @trip.update(trip_params)
      render :show
    else
      render json: @trip.errors.full_messages, status: 422
    end
  end

  def index
    @trips = if params[:led_by] == "me"
               current_user.created_trips
             elsif params[:led_by] == "friends"
               current_user.friends_trips.visible
             else
               current_user.created_trips.or(current_user.friends_trips).visible
             end

    if params[:when] == "past"
      @trips = @trips.before(params[:date])
    elsif params[:when] == "upcoming"
      @trips = @trips.after(params[:date])
    end

    @trips.includes(:creator, :attendances, :attend_requests)
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
    base_params = %i[
      details
      end_date
      location
      privacy
      spaces
      start_date
      title
    ]
    cover_photo_param = params[:trip][:cover_photo]
    if cover_photo_param == "" || cover_photo_param.is_a?(String)
      params.require(:trip).permit(*base_params)
    else
      params.require(:trip).permit(*base_params, :cover_photo)
    end
  end
end
