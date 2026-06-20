Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/signup', to: 'auth#signup'
      post '/login', to: 'auth#login'
      delete '/logout', to: 'auth#logout'
      get '/me', to: 'auth#me'

      resources :subscriptions, only: [:index, :show, :create, :update, :destroy]
      resources :categories, only: [:index]
      get '/dashboard', to: 'dashboard#index'
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
