Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :attend_requests, only: [:create, :index, :destroy]
    resources :friend_requests, only: [:create, :index, :destroy]
    resources :friends, only: [:create, :index, :destroy]
    resource  :session, only: [:create, :destroy]
    resources :trips, except: [:new, :edit]
    resources :users, only: [:create, :destroy, :update, :index]
  end

  if Rails.env.test? || Rails.env.development?
    # for cypress before specs
    # TODO: only for development enviroment
    namespace :test do
      post 'clean_database', to: 'databases#clean_database'
      post 'seed_database', to: 'databases#seed_database'
    end
  end
end
