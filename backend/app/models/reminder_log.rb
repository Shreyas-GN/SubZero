class ReminderLog < ApplicationRecord
  belongs_to :user
  belongs_to :subscription

  enum :status, { pending: 0, sent: 1, failed: 2 }, validate: true

  validates :email, presence: true, length: { maximum: 255 }
  validates :reminder_date, presence: true
  validates :status, presence: true
end
