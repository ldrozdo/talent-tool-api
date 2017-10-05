require 'rails_helper'

RSpec.describe Translation, type: :model do
  it { should belong_to(:language) }
  it { should belong_to(:category) }
end
