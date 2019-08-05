class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :logged_in?, :current_user

  def logged_in?
    !!current_user
  end

  def logged_out?
    !current_user
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    @current_user = user
    session[:session_token] = current_user.reset_session_token!
  end

  def logout!
    current_user.try(:reset_session_token!)
    session[:session_token] = nil
  end

  def require_sign_in
    if logged_out?
      render json: { message: "Sign in required" }, status: :unauthorized
    end
  end
end
