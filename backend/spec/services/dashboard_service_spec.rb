require 'rails_helper'

RSpec.describe DashboardService, type: :model do
  let(:user) { create(:user) }

  describe ".summary" do
    it "returns a hash with the three expected keys" do
      result = DashboardService.summary(user)
      expect(result.keys).to match_array(%i[total_monthly_spend status_counts category_breakdown])
    end

    context "with no subscriptions" do
      it "returns zeroed metrics" do
        result = DashboardService.summary(user)
        expect(result[:total_monthly_spend]).to eq(0)
        expect(result[:status_counts]).to eq(active: 0, cancelled: 0, paused: 0)
        expect(result[:category_breakdown]).to be_empty
      end
    end

    context "total_monthly_spend" do
      it "normalizes monthly subscriptions as-is" do
        create(:subscription, user: user, amount: 100, billing_cycle: :monthly)
        expect(DashboardService.summary(user)[:total_monthly_spend]).to eq(100.0)
      end

      it "divides quarterly amount by 3" do
        create(:subscription, user: user, amount: 300, billing_cycle: :quarterly)
        expect(DashboardService.summary(user)[:total_monthly_spend]).to eq(100.0)
      end

      it "divides yearly amount by 12" do
        create(:subscription, user: user, amount: 1200, billing_cycle: :yearly)
        expect(DashboardService.summary(user)[:total_monthly_spend]).to eq(100.0)
      end

      it "sums multiple active subscriptions" do
        create(:subscription, user: user, amount: 100, billing_cycle: :monthly)
        create(:subscription, user: user, amount: 600, billing_cycle: :yearly)
        expect(DashboardService.summary(user)[:total_monthly_spend]).to eq(150.0)
      end

      it "excludes cancelled and paused subscriptions" do
        create(:subscription, :cancelled, user: user, amount: 500, billing_cycle: :monthly)
        create(:subscription, :paused,    user: user, amount: 500, billing_cycle: :monthly)
        expect(DashboardService.summary(user)[:total_monthly_spend]).to eq(0)
      end

      it "excludes soft-deleted subscriptions" do
        create(:subscription, :soft_deleted, user: user, amount: 1000, billing_cycle: :monthly)
        expect(DashboardService.summary(user)[:total_monthly_spend]).to eq(0)
      end
    end

    context "status_counts" do
      it "counts subscriptions by status" do
        create(:subscription, user: user)
        create(:subscription, :cancelled, user: user)
        create(:subscription, :paused, user: user)

        counts = DashboardService.summary(user)[:status_counts]
        expect(counts).to eq(active: 1, cancelled: 1, paused: 1)
      end

      it "returns zero for missing statuses" do
        counts = DashboardService.summary(user)[:status_counts]
        expect(counts[:active]).to eq(0)
        expect(counts[:cancelled]).to eq(0)
        expect(counts[:paused]).to eq(0)
      end
    end

    context "category_breakdown" do
      it "groups monthly spend by category name" do
        cat = create(:category, name: "Streaming")
        create(:subscription, user: user, amount: 200, billing_cycle: :monthly, category: cat)

        breakdown = DashboardService.summary(user)[:category_breakdown]
        expect(breakdown["Streaming"]).to eq(200.0)
      end

      it "buckets subscriptions without a category as Uncategorized" do
        create(:subscription, user: user, amount: 100, billing_cycle: :monthly)

        breakdown = DashboardService.summary(user)[:category_breakdown]
        expect(breakdown["Uncategorized"]).to eq(100.0)
      end

      it "excludes cancelled subscriptions from the breakdown" do
        cat = create(:category, name: "Music")
        create(:subscription, :cancelled, user: user, amount: 999, billing_cycle: :monthly, category: cat)

        breakdown = DashboardService.summary(user)[:category_breakdown]
        expect(breakdown["Music"]).to be_nil
      end
    end
  end
end
