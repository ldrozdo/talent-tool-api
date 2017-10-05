class QueryLanguage < ApplicationRecord
  belongs_to :query
  belongs_to :language
end
