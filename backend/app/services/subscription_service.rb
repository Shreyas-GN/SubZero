class SubscriptionService
  def self.list(user)
    user.subscriptions.active_records.includes(:category).order(renewal_date: :asc)
  end

  def self.create(user, params)
    subscription = user.subscriptions.build(params)

    if subscription.save
      { success: true, data: subscription, errors: [] }
    else
      { success: false, data: nil, errors: subscription.errors.full_messages }
    end
  rescue StandardError => e
    Rails.logger.error("SubscriptionService#create failed: #{e.message}")
    { success: false, data: nil, errors: ["Failed to create subscription. Please try again."] }
  end

  def self.update(user, id, params)
    subscription = user.subscriptions.active_records.find(id)

    if subscription.update(params)
      { success: true, data: subscription, errors: [] }
    else
      { success: false, data: nil, errors: subscription.errors.full_messages }
    end
  rescue ActiveRecord::RecordNotFound
    { success: false, data: nil, errors: ["Subscription not found"] }
  rescue StandardError => e
    Rails.logger.error("SubscriptionService#update failed: #{e.message}")
    { success: false, data: nil, errors: ["Failed to update subscription. Please try again."] }
  end

  def self.destroy(user, id)
    subscription = user.subscriptions.active_records.find(id)
    subscription.soft_delete

    { success: true, data: nil, errors: [] }
  rescue ActiveRecord::RecordNotFound
    { success: false, data: nil, errors: ["Subscription not found"] }
  rescue StandardError => e
    Rails.logger.error("SubscriptionService#destroy failed: #{e.message}")
    { success: false, data: nil, errors: ["Failed to cancel subscription. Please try again."] }
  end
end
