class Api::ItineraryItemsController < ApplicationController
  before_action :require_sign_in, except: :index
  before_action :set_trip, except: :index
  before_action :ensure_attending_or_leader!, except: :index

  def create
    @item = @trip.itinerary_items.build(itinerary_item_params)

    if @item.save
      render :show
    else
      render json: { "errors" => @item.errors.messages }
    end
  end

  def index
    @itinerary_items = ItineraryItem.all
  end

  # TODO: update

  def destroy
    @item = @trip.itinerary_items.find(params[:id])

    if @item.destroy
      render :show
    else
      render json: { "errors" => @item.errors.messages }
    end
  end

  private

  def set_trip
    @trip = Trip.find(params[:trip_id])
  end

  def ensure_attending_or_leader!
    unless @trip.is_attending_or_leader?(current_user)
      render json: {}, status: :unauthorized
    end
  end

  def itinerary_item_params
    params.require(:itinerary_item).permit(
      :start_time,
      :end_time,
      :start_date,
      :end_date,
      :position,
      :description,
      :trip_id,
      :title
    )
  end
end
