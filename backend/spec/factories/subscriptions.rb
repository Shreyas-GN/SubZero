FactoryBot.define do
  factory :subscription do
    association :user
    name { "Netflix" }
    amount { 649.00 }
    currency { "INR" }
    billing_cycle { :monthly }
    renewal_date { Date.current + 7.days }
    status { :active }
    deleted_at { nil }

    trait :with_category do
      association :category
    end

    trait :quarterly do
      billing_cycle { :quarterly }
      amount { 1500.00 }
    end

    trait :yearly do
      billing_cycle { :yearly }
      amount { 9999.00 }
    end

    trait :cancelled do
      status { :cancelled }
    end

    trait :paused do
      status { :paused }
    end

    trait :due_tomorrow do
      renewal_date { Date.tomorrow }
    end

    trait :soft_deleted do
      deleted_at { Time.current }
      status { :cancelled }
    end
  end
end
