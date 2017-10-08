FactoryGirl.define do
  factory :term do
    operator {  'OR' }
    category_id nil
    query_id nil
  end
end
