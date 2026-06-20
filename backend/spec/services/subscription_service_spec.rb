require 'rails_helper'

RSpec.describe SubscriptionService, type: :model do
  let(:user)     { create(:user) }
  let(:sub_params) do
    { name: "Spotify", amount: 119, billing_cycle: "monthly",
      renewal_date: Date.current + 10.days, status: "active" }
  end

  describe ".list" do
    it "returns active (non-deleted) subscriptions for the user ordered by renewal_date" do
      s1 = create(:subscription, user: user, renewal_date: Date.current + 5.days)
      s2 = create(:subscription, user: user, renewal_date: Date.current + 1.day)
      create(:subscription, :soft_deleted, user: user)
      other_user = create(:user)
      create(:subscription, user: other_user)

      result = SubscriptionService.list(user)
      expect(result).to eq([s2, s1])
    end

    it "eager-loads category to avoid N+1" do
      create(:subscription, :with_category, user: user)
      result = SubscriptionService.list(user)
      expect(result.first.association(:category)).to be_loaded
    end
  end

  describe ".create" do
    it "creates and returns the subscription on valid params" do
      result = SubscriptionService.create(user, sub_params)
      expect(result[:success]).to be true
      expect(result[:data]).to be_a(Subscription)
      expect(result[:data].user).to eq(user)
      expect(result[:errors]).to be_empty
    end

    it "returns failure with errors on invalid params" do
      result = SubscriptionService.create(user, sub_params.merge(amount: -5))
      expect(result[:success]).to be false
      expect(result[:data]).to be_nil
      expect(result[:errors]).not_to be_empty
    end
  end

  describe ".update" do
    let!(:subscription) { create(:subscription, user: user) }

    it "updates and returns the subscription" do
      result = SubscriptionService.update(user, subscription.id, { name: "Updated Name" })
      expect(result[:success]).to be true
      expect(result[:data].name).to eq("Updated Name")
    end

    it "returns failure on invalid params" do
      result = SubscriptionService.update(user, subscription.id, { amount: 0 })
      expect(result[:success]).to be false
      expect(result[:errors]).not_to be_empty
    end

    it "returns not-found error for a different user's subscription" do
      other_user = create(:user)
      result = SubscriptionService.update(other_user, subscription.id, { name: "Hack" })
      expect(result[:success]).to be false
      expect(result[:errors]).to include("Subscription not found")
    end
  end

  describe ".destroy" do
    let!(:subscription) { create(:subscription, user: user) }

    it "soft-deletes the subscription and returns success" do
      result = SubscriptionService.destroy(user, subscription.id)
      expect(result[:success]).to be true
      expect(subscription.reload.deleted_at).to be_present
    end

    it "returns not-found error for a different user's subscription" do
      other_user = create(:user)
      result = SubscriptionService.destroy(other_user, subscription.id)
      expect(result[:success]).to be false
      expect(result[:errors]).to include("Subscription not found")
    end
  end
end
