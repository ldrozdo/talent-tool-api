FactoryGirl.define do
  factory :translation do
    translated_query {  Faker::Simpsons.quote }
    # association :user, factory: :user
    language_id nil
    category_id nil
  end
end
