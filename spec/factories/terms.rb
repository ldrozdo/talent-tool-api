FactoryGirl.define do
  factory :term do
    operator {  'OR' }
    # association :user, factory: :user
    category_id nil
    query_id nil
  end
end
