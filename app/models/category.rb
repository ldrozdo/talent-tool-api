class Category < ApplicationRecord
  # before_save { self.name = name.capitalize }
  has_many :terms, dependent: :destroy
  has_many :queries, through: :terms
  has_many :translations, dependent: :destroy
  has_many :languages, through: :translations

  validates :name, presence: true, length: { in: 2..30  }, uniqueness: { case_sensitive: false }
  validates :category_query, presence: true


end
