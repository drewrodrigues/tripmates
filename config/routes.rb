# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#       api_attend_requests GET    /api/attend_requests(.:format)                                                           api/attend_requests#index {:format=>:json}
#                           POST   /api/attend_requests(.:format)                                                           api/attend_requests#create {:format=>:json}
#        api_attend_request DELETE /api/attend_requests/:id(.:format)                                                       api/attend_requests#destroy {:format=>:json}
#           api_attendances POST   /api/attendances(.:format)                                                               api/attendances#create {:format=>:json}
#            api_attendance DELETE /api/attendances/:id(.:format)                                                           api/attendances#destroy {:format=>:json}
#       api_friend_requests GET    /api/friend_requests(.:format)                                                           api/friend_requests#index {:format=>:json}
#                           POST   /api/friend_requests(.:format)                                                           api/friend_requests#create {:format=>:json}
#        api_friend_request DELETE /api/friend_requests/:id(.:format)                                                       api/friend_requests#destroy {:format=>:json}
#               api_friends GET    /api/friends(.:format)                                                                   api/friends#index {:format=>:json}
#                           POST   /api/friends(.:format)                                                                   api/friends#create {:format=>:json}
#                api_friend DELETE /api/friends/:id(.:format)                                                               api/friends#destroy {:format=>:json}
#              api_messages POST   /api/messages(.:format)                                                                  api/messages#create {:format=>:json}
#               api_message DELETE /api/messages/:id(.:format)                                                              api/messages#destroy {:format=>:json}
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#      api_trip_attendances GET    /api/trips/:trip_id/attendances(.:format)                                                api/attendances#index {:format=>:json}
#         api_trip_messages GET    /api/trips/:trip_id/messages(.:format)                                                   api/messages#index {:format=>:json}
#                 api_trips GET    /api/trips(.:format)                                                                     api/trips#index {:format=>:json}
#                           POST   /api/trips(.:format)                                                                     api/trips#create {:format=>:json}
#                  api_trip GET    /api/trips/:id(.:format)                                                                 api/trips#show {:format=>:json}
#                           PATCH  /api/trips/:id(.:format)                                                                 api/trips#update {:format=>:json}
#                           PUT    /api/trips/:id(.:format)                                                                 api/trips#update {:format=>:json}
#                           DELETE /api/trips/:id(.:format)                                                                 api/trips#destroy {:format=>:json}
#                 api_users GET    /api/users(.:format)                                                                     api/users#index {:format=>:json}
#                           POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#                  api_user PATCH  /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#                           PUT    /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#                           DELETE /api/users/:id(.:format)                                                                 api/users#destroy {:format=>:json}
#       test_clean_database POST   /test/clean_database(.:format)                                                           test/databases#clean_database
#        test_seed_database POST   /test/seed_database(.:format)                                                            test/databases#seed_database
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :attend_requests, only: [:create, :index, :destroy]
    resources :attendances, only: [:create, :destroy]
    resources :friend_requests, only: [:create, :index, :destroy]
    resources :friends, only: [:create, :index, :destroy]
    resources :messages, only: [:create, :destroy]
    resource  :session, only: [:create, :destroy]
    resources :trips, except: [:new, :edit] do
      resources :attendances, only: [:index]
      resources :messages, only: [:index]
    end
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
