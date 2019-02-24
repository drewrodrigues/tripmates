Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :destroy, :update] do
      resources :trips, only: [:index, :create]
    end
    resource  :session, only: [:create, :destroy]
    resources :trips, except: [:index, :create, :new, :edit]
  end
end