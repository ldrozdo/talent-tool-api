class Query < ApplicationRecord
  has_many :terms, dependent: :destroy
  has_many :categories, through: :terms
  has_many :query_languages, dependent: :destroy
  has_many :languages, through: :query_languages
  belongs_to :user
  validates :name, presence: true, length: { in: 2..30  }

  def expanded_query_linkedin
    if text_of_query.blank?
      expanded_query = expand_simple_query
    else
      splitted_query = text_of_query.split("'")
      expanded_query = ""
      splitted_query.each do |part_of_query|
        was_category = false;
        categories.each do |category|
          if part_of_query == category.name
            was_category = true;
            expanded_query += category.category_query
          end
        end
        if was_category == false
          expanded_query += part_of_query
        end
      end
    end
    expanded_query
  end

  def build_simple_query
    simple_query = ""
    and_terms = Array.new
    or_terms = Array.new
    not_terms = Array.new

    terms.each do |term|
      if term.operator == "AND"
        and_terms << term
      elsif term.operator == "OR"
        or_terms << term
      else
        not_terms << term
      end
    end

    if !and_terms.empty?
      simple_query += "( "
    end
    last = and_terms.size - 1
    counter = 0
    and_terms.each do |and_term|
      if (counter == last)
        simple_query += and_term.category_name + ") "
      else
        simple_query += and_term.category_name + " " + and_term.operator + " "
      end
      counter += 1
    end

    if !or_terms.empty?
      simple_query += "AND ( "
    end
    last = or_terms.size - 1
    counter = 0
    or_terms.each do |or_term|
      if (counter == last)
        simple_query += or_term.category_name + ") "
      else
        simple_query += or_term.category_name + " " + or_term.operator + " "
      end
      counter += 1
    end

    if !not_terms.empty?
      simple_query += "AND NOT ( "
    end
    last = not_terms.size - 1
    counter = 0
    not_terms.each do |not_term|
      if (counter == last)
        simple_query += not_term.category_name + ") "
      else
        simple_query += not_term.category_name + " OR "
      end
      counter += 1
    end
    simple_query
  end

  def expand_simple_query
    simple_query = ""
    and_terms = Array.new
    or_terms = Array.new
    not_terms = Array.new

    terms.each do |term|
      if term.operator == "AND"
        and_terms << term
      elsif term.operator == "OR"
        or_terms << term
      else
        not_terms << term
      end
    end

    if !and_terms.empty?
      simple_query += "( "
    end
    last = and_terms.size - 1
    counter = 0
    and_terms.each do |and_term|
      if (counter == last)
        simple_query += and_term.category_query + ") "
      else
        simple_query += and_term.category_query + " " + and_term.operator + " "
      end
      counter += 1
    end

    if !or_terms.empty?
      simple_query += "AND ( "
    end
    last = or_terms.size - 1
    counter = 0
    or_terms.each do |or_term|
      if (counter == last)
        simple_query += or_term.category_query + ") "
      else
        simple_query += or_term.category_query + " " + or_term.operator + " "
      end
      counter += 1
    end

    if !not_terms.empty?
      simple_query += "AND NOT ( "
    end
    last = not_terms.size - 1
    counter = 0
    not_terms.each do |not_term|
      if (counter == last)
        simple_query += not_term.category_query + ") "
      else
        simple_query += not_term.category_query + " OR "
      end
      counter += 1
    end
    simple_query
  end

end
