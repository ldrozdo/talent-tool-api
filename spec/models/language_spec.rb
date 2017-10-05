require 'rails_helper'

RSpec.describe Language, type: :model do
  # Association tests
  it { should have_many(:translations).dependent(:destroy) }
  it { should have_many(:query_languages).dependent(:destroy) }
  # Validation tests
  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name).case_insensitive }
  it { should validate_length_of(:name).is_at_least(2) }
  it { should validate_length_of(:name).is_at_most(30) }
end
