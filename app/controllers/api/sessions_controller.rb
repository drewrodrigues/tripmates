class Api::SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(email, password)
    if user
      login!(user)
      render json: user
    else
      render json: {errors: "Failed to login"}, status: 400
    end
  end
  
  def destroy
    logout!(user)
    render json: "Successfully logged out"
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def email
    user_params[:email]
  end

  def password
    user_params[:password]
  end
end
