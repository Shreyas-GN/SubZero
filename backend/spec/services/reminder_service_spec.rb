require 'rails_helper'

RSpec.describe ReminderService, type: :model do
  let(:user)         { create(:user, notifications_enabled: true) }
  let(:subscription) { create(:subscription, :due_tomorrow, user: user) }

  before do
    allow(SubscriptionMailer).to receive_message_chain(:renewal_reminder, :deliver_later)
  end

  describe ".send_reminders" do
    it "sends a reminder and creates a sent ReminderLog for a due subscription" do
      subscription
      expect {
        ReminderService.send_reminders
      }.to change(ReminderLog, :count).by(1)

      log = ReminderLog.last
      expect(log.status).to eq("sent")
      expect(log.subscription).to eq(subscription)
      expect(log.reminder_date).to eq(Date.today)
    end

    it "calls the mailer for each due subscription" do
      subscription
      ReminderService.send_reminders
      expect(SubscriptionMailer).to have_received(:renewal_reminder).with(user, subscription)
    end

    it "does not send a reminder if one was already sent today (deduplication)" do
      create(:reminder_log, user: user, subscription: subscription, reminder_date: Date.today)

      expect {
        ReminderService.send_reminders
      }.not_to change(ReminderLog, :count)

      expect(SubscriptionMailer).not_to have_received(:renewal_reminder)
    end

    it "skips subscriptions for users with notifications disabled" do
      user.update!(notifications_enabled: false)
      subscription

      ReminderService.send_reminders
      expect(ReminderLog.count).to eq(0)
    end

    it "skips soft-deleted subscriptions" do
      sub = create(:subscription, :due_tomorrow, :soft_deleted, user: user)

      ReminderService.send_reminders
      expect(ReminderLog.where(subscription: sub).count).to eq(0)
    end

    it "creates a failed ReminderLog when the mailer raises an error" do
      allow(SubscriptionMailer).to receive(:renewal_reminder).and_raise(StandardError, "SMTP timeout")
      subscription

      expect {
        ReminderService.send_reminders
      }.to change(ReminderLog, :count).by(1)

      log = ReminderLog.last
      expect(log.status).to eq("failed")
      expect(log.error_message).to include("SMTP timeout")
    end

    it "continues processing remaining subscriptions after a single failure" do
      failing_sub  = create(:subscription, :due_tomorrow, user: user)
      passing_sub  = create(:subscription, :due_tomorrow, user: create(:user, notifications_enabled: true))

      call_count = 0
      allow(SubscriptionMailer).to receive(:renewal_reminder) do |_u, sub|
        call_count += 1
        raise StandardError, "fail" if sub == failing_sub

        double(deliver_later: nil)
      end

      ReminderService.send_reminders
      expect(ReminderLog.count).to eq(2)
      expect(ReminderLog.find_by(subscription: passing_sub).status).to eq("sent")
    end
  end
end
