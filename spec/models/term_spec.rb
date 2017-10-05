require 'rails_helper'

RSpec.describe Term, type: :model do
  it { should belong_to(:query) }
  it { should belong_to(:category) }
end
