class Api::AttendRequestsController < ApplicationController
  before_action :require_sign_in

  def create
    trip = Trip.find(params[:trip_id])
    @attend_request = current_user.attend_requests.build(trip: trip)
    if @attend_request.save
      render :show
    else
      render json:
                 { errors: @attend_request.errors.full_messages },
             status: 422
    end
  end

  def index
    @attend_requests = Trip.find(params[:trip_id]).attend_requests.includes(:user)
  end

  def destroy
    attend_request = current_user.attend_requests.find_by(id: params[:id]) ||
      current_user.managed_attend_requests.find(id: params[:id])
    if attend_request.destroy
      render json: {}, status: :ok
    else
      # TODO: refactor?
      render json: {
        errors: ["Only trip leader and requesting user can cancel request"]
      }, status: :unauthorized
    end
  end
end
