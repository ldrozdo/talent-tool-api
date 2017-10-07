FactoryGirl.define do
  factory :language do
    # name { Faker::StarWars.unique.character  }
    name { Faker::Name.unique.first_name }
  end
end
