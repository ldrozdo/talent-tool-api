require 'rails_helper'

RSpec.describe QueryLanguage, type: :model do
  # Association tests
  it { should belong_to(:language) }
  it { should belong_to(:query) }
end
