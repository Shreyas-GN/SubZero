FactoryBot.define do
  factory :category do
    sequence(:name) { |n| "Category #{n}" }
    color { "#6366F1" }
  end
end
