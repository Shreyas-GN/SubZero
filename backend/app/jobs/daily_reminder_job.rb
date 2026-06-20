class DailyReminderJob
  include Sidekiq::Worker
  def perform = ReminderService.send_reminders
end
