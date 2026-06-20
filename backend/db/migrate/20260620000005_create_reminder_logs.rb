class CreateReminderLogs < ActiveRecord::Migration[8.0]
  def change
    create_table :reminder_logs, id: :uuid, default: "gen_random_uuid()" do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :subscription, null: false, foreign_key: true, type: :uuid
      t.string :email, limit: 255, null: false
      t.date :reminder_date, null: false
      t.timestamp :sent_at
      t.integer :status, default: 0, null: false
      t.text :error_message

      t.timestamps
    end

    add_index :reminder_logs, :reminder_date
    add_index :reminder_logs, [:subscription_id, :reminder_date]
  end
end
