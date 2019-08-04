Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :destroy, :update, :index]
    resources :trips, only: :index
    resources :friend_requests, only: [:create, :index, :destroy]
    resource  :session, only: [:create, :destroy]
    resources :trips, except: [:index, :new, :edit]
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
