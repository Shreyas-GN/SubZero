class AddWebsiteUrlToSubscriptions < ActiveRecord::Migration[8.1]
  def change
    add_column :subscriptions, :website_url, :string, limit: 500
  end
end
