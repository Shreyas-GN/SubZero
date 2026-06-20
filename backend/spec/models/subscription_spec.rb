require 'rails_helper'

RSpec.describe Subscription, type: :model do
  subject(:subscription) { build(:subscription) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(subscription).to be_valid
    end

    it "requires name" do
      subscription.name = nil
      expect(subscription).not_to be_valid
      expect(subscription.errors[:name]).to include("can't be blank")
    end

    it "enforces name length limit" do
      subscription.name = "a" * 256
      expect(subscription).not_to be_valid
    end

    it "requires amount" do
      subscription.amount = nil
      expect(subscription).not_to be_valid
      expect(subscription.errors[:amount]).to be_present
    end

    it "rejects amount of zero" do
      subscription.amount = 0
      expect(subscription).not_to be_valid
      expect(subscription.errors[:amount]).to include("must be greater than 0")
    end

    it "rejects negative amount" do
      subscription.amount = -1
      expect(subscription).not_to be_valid
    end

    it "requires renewal_date" do
      subscription.renewal_date = nil
      expect(subscription).not_to be_valid
      expect(subscription.errors[:renewal_date]).to include("can't be blank")
    end

    it "requires billing_cycle" do
      subscription.billing_cycle = nil
      expect(subscription).not_to be_valid
    end

    it "requires status" do
      subscription.status = nil
      expect(subscription).not_to be_valid
    end
  end

  describe "enums" do
    it "defines billing_cycle enum values" do
      expect(Subscription.billing_cycles).to eq("monthly" => 0, "quarterly" => 1, "yearly" => 2)
    end

    it "defines status enum values" do
      expect(Subscription.statuses).to eq("active" => 0, "cancelled" => 1, "paused" => 2)
    end
  end

  describe "scopes" do
    let(:user) { create(:user) }

    describe ".active_records" do
      it "excludes soft-deleted subscriptions" do
        live = create(:subscription, user: user)
        dead = create(:subscription, :soft_deleted, user: user)

        expect(Subscription.active_records).to include(live)
        expect(Subscription.active_records).not_to include(dead)
      end
    end

    describe ".for_user" do
      it "filters subscriptions by user_id" do
        other_user = create(:user)
        mine = create(:subscription, user: user)
        theirs = create(:subscription, user: other_user)

        expect(Subscription.for_user(user.id)).to include(mine)
        expect(Subscription.for_user(user.id)).not_to include(theirs)
      end
    end

    describe ".upcoming_renewals" do
      it "returns active subscriptions renewing within the given window" do
        soon = create(:subscription, :due_tomorrow, user: user)
        far  = create(:subscription, renewal_date: 30.days.from_now, user: user)

        expect(Subscription.upcoming_renewals(7)).to include(soon)
        expect(Subscription.upcoming_renewals(7)).not_to include(far)
      end

      it "excludes cancelled subscriptions" do
        cancelled = create(:subscription, :due_tomorrow, :cancelled, user: user)
        expect(Subscription.upcoming_renewals(7)).not_to include(cancelled)
      end
    end
  end

  describe "#soft_delete" do
    it "sets deleted_at and marks status as cancelled" do
      sub = create(:subscription)
      sub.soft_delete
      sub.reload

      expect(sub.deleted_at).to be_present
      expect(sub.status).to eq("cancelled")
      expect(Subscription.active_records.find_by(id: sub.id)).to be_nil
    end
  end

  describe "#deleted?" do
    it "returns false when not deleted" do
      expect(subscription).not_to be_deleted
    end

    it "returns true after soft_delete" do
      sub = create(:subscription)
      sub.soft_delete
      expect(sub).to be_deleted
    end
  end
end
