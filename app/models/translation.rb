class Translation < ApplicationRecord
  belongs_to :language
  belongs_to :category

  def language_name
    language.name
  end

  def category_name
    category.name
  end
end
