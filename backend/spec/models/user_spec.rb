require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(user).to be_valid
    end

    it "requires name" do
      user.name = nil
      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("can't be blank")
    end

    it "enforces name length limit" do
      user.name = "a" * 101
      expect(user).not_to be_valid
    end

    it "requires email" do
      user.email = nil
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "rejects malformed email" do
      user.email = "not-an-email"
      expect(user).not_to be_valid
      expect(user.errors[:email]).to be_present
    end

    it "rejects duplicate email (case-insensitive)" do
      create(:user, email: "dupe@example.com")
      user.email = "DUPE@EXAMPLE.COM"
      expect(user).not_to be_valid
      expect(user.errors[:email]).to be_present
    end

    it "rejects unsupported currency" do
      user.currency = "XYZ"
      expect(user).not_to be_valid
      expect(user.errors[:currency]).to be_present
    end

    it "accepts all supported currencies" do
      User::SUPPORTED_CURRENCIES.each do |currency|
        expect(build(:user, currency: currency)).to be_valid
      end
    end
  end

  describe "associations" do
    it "has many subscriptions" do
      user = create(:user)
      create(:subscription, user: user)
      expect(user.subscriptions.count).to eq(1)
    end

    it "has many reminder_logs" do
      user = create(:user)
      sub = create(:subscription, user: user)
      create(:reminder_log, user: user, subscription: sub)
      expect(user.reminder_logs.count).to eq(1)
    end
  end

  describe ".active scope" do
    it "excludes soft-deleted users" do
      active_user = create(:user)
      deleted_user = create(:user)
      deleted_user.soft_delete

      expect(User.active).to include(active_user)
      expect(User.active).not_to include(deleted_user)
    end
  end

  describe "#soft_delete" do
    it "sets deleted_at timestamp" do
      user = create(:user)
      expect { user.soft_delete }.to change { user.deleted_at }.from(nil)
    end
  end

  describe "#deleted?" do
    it "returns false when not deleted" do
      expect(user).not_to be_deleted
    end

    it "returns true after soft_delete" do
      user = create(:user)
      user.soft_delete
      expect(user).to be_deleted
    end
  end
end
