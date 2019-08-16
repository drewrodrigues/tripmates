class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render :show
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def index
    @users = User.all
  end

  private

  def user_params
    base_params = %i[first_name last_name password email]
    if params["user"]["profile_picture"] == ""
      params.require(:user).permit(*base_params)
    else
      params.require(:user).permit(*base_params, :profile_picture)
    end
  end
end
