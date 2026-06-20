class CreateCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :categories, id: :uuid, default: "gen_random_uuid()" do |t|
      t.string :name, limit: 100, null: false
      t.string :color, limit: 20

      t.timestamps
    end

    add_index :categories, :name, unique: true
  end
end
