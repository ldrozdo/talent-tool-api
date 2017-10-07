class Translation < ApplicationRecord
  belongs_to :language
  belongs_to :category
  validates :translated_query, presence: true

  def language_name
    language.name
  end

  def category_name
    category.name
  end
end
