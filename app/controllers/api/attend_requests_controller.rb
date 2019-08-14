class Api::AttendRequestsController < ApplicationController
  before_action :require_sign_in

  def create
    @attend_request = current_user.attend_requests.build(attend_request_params)
    if @attend_request.save
      render :show
    else
      render json:
                 { errors: @attend_request.errors.full_messages },
                   status: 422
    end
  end

  def index
    @attend_requests = current_user.attend_requests
  end

  def destroy
    attend_request = current_user.attend_requests.find_by(id: params[:id]) ||
                     current_user.managed_attend_requests.find_by(id: params[:id])
    if attend_request&.destroy
      render json: {}, status: :ok
    else
      # TODO: refactor?
      render json: { errors: ["Only trip leader and requesting user can cancel attend requests"] }, status: :unauthorized
    end
  end

  private

  def attend_request_params
    params.require(:attend_request).permit(:trip_id)
  end
end