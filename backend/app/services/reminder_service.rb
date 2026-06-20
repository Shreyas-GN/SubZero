class ReminderService
  def self.send_reminders
    subscriptions_due_tomorrow.each { |sub| send_and_log(sub) }
  end

  class << self
    private

    def subscriptions_due_tomorrow
      Subscription
        .active_records
        .active
        .where(renewal_date: Date.tomorrow)
        .joins(:user)
        .where(users: { notifications_enabled: true, deleted_at: nil })
        .includes(:user)
    end

    def already_reminded?(subscription)
      ReminderLog.exists?(subscription: subscription, reminder_date: Date.today)
    end

    def send_and_log(subscription)
      return if already_reminded?(subscription)

      user = subscription.user
      SubscriptionMailer.renewal_reminder(user, subscription).deliver_later
      ReminderLog.create!(
        user: user,
        subscription: subscription,
        email: user.email,
        reminder_date: Date.today,
        status: :sent,
        sent_at: Time.current
      )
    rescue => e
      Rails.logger.error("[ReminderService] subscription=#{subscription.id} error=#{e.message}")
      ReminderLog.create(
        user: subscription.user,
        subscription: subscription,
        email: subscription.user.email,
        reminder_date: Date.today,
        status: :failed,
        error_message: e.message
      )
    end
  end
end
