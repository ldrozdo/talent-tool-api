Rails.application.routes.draw do
  # resources :queries
  # resources :categories
  resources :languages

  resources :categories do
    resources :languages do
      resources :translations
    end
  end

  resources :queries do
    resources :terms
  end

  resources :queries do
    resources :query_languages
  end
end
