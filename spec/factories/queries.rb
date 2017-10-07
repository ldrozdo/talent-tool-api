FactoryGirl.define do
  factory :query do
    name { Faker::Simpsons.character  }
    text_of_query {  Faker::Simpsons.quote }
    # association :user, factory: :user
    user_id nil
  end
end
