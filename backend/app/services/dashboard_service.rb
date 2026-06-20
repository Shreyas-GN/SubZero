class DashboardService
  MONTHLY_DIVISOR = { "monthly" => 1, "quarterly" => 3, "yearly" => 12 }.freeze

  def self.summary(user)
    subscriptions = user.subscriptions.active_records.includes(:category)

    {
      total_monthly_spend: total_monthly_spend(subscriptions),
      status_counts: status_counts(subscriptions),
      category_breakdown: category_breakdown(subscriptions)
    }
  rescue StandardError => e
    Rails.logger.error("DashboardService#summary failed: #{e.message}")
    raise
  end

  def self.total_monthly_spend(subscriptions)
    subscriptions.active.sum do |s|
      s.amount / MONTHLY_DIVISOR[s.billing_cycle]
    end.round(2)
  end

  def self.category_breakdown(subscriptions)
    subscriptions.active.group_by { |s| s.category&.name || "Uncategorized" }.transform_values do |subs|
      subs.sum { |s| s.amount / MONTHLY_DIVISOR[s.billing_cycle] }.round(2)
    end
  end

  def self.status_counts(subscriptions)
    counts = subscriptions.group_by(&:status).transform_values(&:count)
    {
      active: counts["active"] || 0,
      cancelled: counts["cancelled"] || 0,
      paused: counts["paused"] || 0
    }
  end

  private_class_method :total_monthly_spend, :category_breakdown, :status_counts
end
