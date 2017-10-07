Rails.application.routes.draw do
  resources :queries
  # resources :categories
  resources :languages

  resources :translations, only: [:show]

  resources :categories do
    resources :translations , only: [:index, :update, :destroy]
  end

  resources :categories do
    resources :languages do
      resources :translations, only: [:create]
    end
  end

  # resources :queries do
  #   resources :categories do
  #     resources :terms
  #   end
  # end
  #
  # resources :queries do
  #   resources :languages do
  #     resources :query_languages
  #   end
  # end
end
