class Category < ApplicationRecord
  has_many :subscriptions, dependent: :restrict_with_error

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 100 }
end
