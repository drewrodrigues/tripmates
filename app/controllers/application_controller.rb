class ApplicationController < ActionController::Base
  def current_user
    @current_user ||= User.find(session[:session_token])
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout
    user.reset_session_token!
    session[:session_token] = nil
  end
end
