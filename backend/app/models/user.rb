class User < ApplicationRecord
  has_secure_password

  has_many :subscriptions, dependent: :destroy
  has_many :reminder_logs, dependent: :destroy
  has_many :sessions, dependent: :destroy

  SUPPORTED_CURRENCIES = %w[INR USD EUR GBP AUD CAD SGD JPY].freeze

  scope :active, -> { where(deleted_at: nil) }

  validates :name, presence: true, length: { maximum: 100 }
  validates :email,
            presence: true,
            uniqueness: { case_sensitive: false },
            length: { maximum: 255 },
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :currency, inclusion: { in: SUPPORTED_CURRENCIES }

  def soft_delete
    update(deleted_at: Time.current)
  end

  def deleted?
    deleted_at.present?
  end
end
