class User < ApplicationRecord
    has_many :queries, dependent: :destroy
    validates_presence_of :username, :role

end
