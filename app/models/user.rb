class User < ApplicationRecord
    has_many :queries, dependent: :destroy
end
