class CreateSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :sessions, id: :uuid, default: "gen_random_uuid()" do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.string :token_digest, limit: 255, null: false
      t.timestamp :expires_at, null: false

      t.timestamps
    end

    add_index :sessions, :expires_at
  end
end
