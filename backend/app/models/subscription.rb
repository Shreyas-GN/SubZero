class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true

  has_many :reminder_logs, dependent: :destroy

  enum :billing_cycle, { monthly: 0, quarterly: 1, yearly: 2 }, validate: true
  enum :status, { active: 0, cancelled: 1, paused: 2 }, validate: true

  scope :active_records, -> { where(deleted_at: nil) }
  scope :for_user, ->(user_id) { where(user_id: user_id) }
  scope :upcoming_renewals, ->(days = 7) { active_records.active.where(renewal_date: Date.current..days.days.from_now.to_date) }

  validates :name, presence: true, length: { maximum: 255 }
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :renewal_date, presence: true
  validates :billing_cycle, presence: true
  validates :status, presence: true

  def soft_delete
    update(deleted_at: Time.current, status: :cancelled)
  end

  def deleted?
    deleted_at.present?
  end
end
