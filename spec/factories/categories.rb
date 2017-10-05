FactoryGirl.define do
  factory :category do
    # name { Faker::StarWars.unique.character  }
    name { Faker::Name.unique.first_name }
    category_query {  Faker::StarWars.quote }
  end
end
