class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users, id: :uuid, default: "gen_random_uuid()" do |t|
      t.string :name, limit: 100, null: false
      t.string :email, limit: 255, null: false
      t.string :password_digest, limit: 255, null: false
      t.string :currency, limit: 10, default: "INR"
      t.boolean :notifications_enabled, default: true
      t.timestamp :deleted_at

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :deleted_at
  end
end
