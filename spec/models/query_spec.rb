require 'rails_helper'

RSpec.describe Query, type: :model do
  # Association tests
  it { should belong_to(:user) }
  it { should have_many(:terms).dependent(:destroy) }
  it { should have_many(:query_languages).dependent(:destroy) }
  # Validation tests
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_least(2) }
  it { should validate_length_of(:name).is_at_most(30) }
end
