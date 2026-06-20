FactoryBot.define do
  factory :user do
    name { "Test User" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "password123" }
    password_confirmation { "password123" }
    currency { "INR" }
    notifications_enabled { true }
    deleted_at { nil }
  end
end
