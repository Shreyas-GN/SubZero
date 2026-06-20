require 'rails_helper'

RSpec.describe ReminderLog, type: :model do
  let(:user)         { create(:user) }
  let(:subscription) { create(:subscription, user: user) }

  subject(:log) { build(:reminder_log, user: user, subscription: subscription) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(log).to be_valid
    end

    it "requires email" do
      log.email = nil
      expect(log).not_to be_valid
      expect(log.errors[:email]).to include("can't be blank")
    end

    it "enforces email length limit" do
      log.email = "a" * 256
      expect(log).not_to be_valid
    end

    it "requires reminder_date" do
      log.reminder_date = nil
      expect(log).not_to be_valid
      expect(log.errors[:reminder_date]).to include("can't be blank")
    end

    it "requires status" do
      log.status = nil
      expect(log).not_to be_valid
    end
  end

  describe "enums" do
    it "defines status values" do
      expect(ReminderLog.statuses).to eq("pending" => 0, "sent" => 1, "failed" => 2)
    end
  end

  describe "associations" do
    it "belongs to user" do
      log = create(:reminder_log, user: user, subscription: subscription)
      expect(log.user).to eq(user)
    end

    it "belongs to subscription" do
      log = create(:reminder_log, user: user, subscription: subscription)
      expect(log.subscription).to eq(subscription)
    end
  end
end
