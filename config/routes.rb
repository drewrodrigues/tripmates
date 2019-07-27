Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :destroy, :update, :index] do
      resources :trips, only: :index
    end
    resources :friend_requests, only: [:create, :index, :destroy]
    resource  :session, only: [:create, :destroy]
    resources :trips, except: [:index, :new, :edit]
  end

  if Rails.env.test?
    # for cypress before specs
    namespace :test do
      post 'clean_database', to: 'databases#clean_database'
    end
  end
end
