class SubscriptionMailer < ApplicationMailer
  def renewal_reminder(user, subscription)
    @user = user
    @subscription = subscription
    @renewal_date = subscription.renewal_date.strftime("%B %-d, %Y")
    @amount = format_amount(subscription)

    mail(
      to: user.email,
      subject: "#{subscription.name} renews tomorrow — #{@amount}"
    )
  end

  private

  def format_amount(subscription)
    symbol = currency_symbol(subscription.currency)
    "#{symbol}#{format('%.2f', subscription.amount)} / #{subscription.billing_cycle}"
  end

  def currency_symbol(currency)
    { "USD" => "$", "EUR" => "€", "GBP" => "£", "INR" => "₹",
      "AUD" => "A$", "CAD" => "C$", "SGD" => "S$", "JPY" => "¥" }.fetch(currency, currency + " ")
  end
end
