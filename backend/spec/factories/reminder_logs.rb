FactoryBot.define do
  factory :reminder_log do
    association :user
    association :subscription
    email { "user@example.com" }
    reminder_date { Date.today }
    status { :sent }
    sent_at { Time.current }
    error_message { nil }
  end
end
