class CreateSubscriptions < ActiveRecord::Migration[8.0]
  def change
    create_table :subscriptions, id: :uuid, default: "gen_random_uuid()" do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :category, null: true, foreign_key: true, type: :uuid
      t.string :name, limit: 255, null: false
      t.decimal :amount, precision: 10, scale: 2, null: false
      t.string :currency, limit: 10, default: "INR"
      t.integer :billing_cycle, default: 0, null: false
      t.date :renewal_date, null: false
      t.integer :status, default: 0, null: false
      t.text :notes
      t.timestamp :deleted_at

      t.timestamps
    end

    add_index :subscriptions, :status
    add_index :subscriptions, :renewal_date
    add_index :subscriptions, :deleted_at
    add_index :subscriptions, [:user_id, :status]
    add_index :subscriptions, [:user_id, :renewal_date]
  end
end
