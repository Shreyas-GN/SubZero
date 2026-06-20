class Session < ApplicationRecord
  belongs_to :user

  scope :active, -> { where("expires_at > ?", Time.current) }

  validates :token_digest, presence: true
  validates :expires_at, presence: true

  def expired?
    expires_at <= Time.current
  end
end
