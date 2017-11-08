class Term < ApplicationRecord
  belongs_to :query
  belongs_to :category

  def category_name
    category.name
  end

  def category_query
    category.category_query
  end

  def all_translated_texts
    translated_texts = Array.new
    category.translations.each do |translation|
      translated_texts << translation.translated_query
    end
    translated_texts
  end
  
end
