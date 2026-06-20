# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_20_000007) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgcrypto"

  create_table "categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "color", limit: 20
    t.datetime "created_at", null: false
    t.string "name", limit: 100, null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "reminder_logs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", limit: 255, null: false
    t.text "error_message"
    t.date "reminder_date", null: false
    t.datetime "sent_at", precision: nil
    t.integer "status", default: 0, null: false
    t.uuid "subscription_id", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id", null: false
    t.index ["reminder_date"], name: "index_reminder_logs_on_reminder_date"
    t.index ["subscription_id", "reminder_date"], name: "index_reminder_logs_on_subscription_id_and_reminder_date"
    t.index ["subscription_id"], name: "index_reminder_logs_on_subscription_id"
    t.index ["user_id"], name: "index_reminder_logs_on_user_id"
  end

  create_table "sessions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "expires_at", precision: nil, null: false
    t.string "token_digest", limit: 255, null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id", null: false
    t.index ["expires_at"], name: "index_sessions_on_expires_at"
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "subscriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.integer "billing_cycle", default: 0, null: false
    t.uuid "category_id"
    t.datetime "created_at", null: false
    t.string "currency", limit: 10, default: "INR"
    t.datetime "deleted_at", precision: nil
    t.string "name", limit: 255, null: false
    t.text "notes"
    t.date "renewal_date", null: false
    t.integer "status", default: 0, null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id", null: false
    t.string "website_url", limit: 500
    t.index ["category_id"], name: "index_subscriptions_on_category_id"
    t.index ["deleted_at"], name: "index_subscriptions_on_deleted_at"
    t.index ["renewal_date"], name: "index_subscriptions_on_renewal_date"
    t.index ["status"], name: "index_subscriptions_on_status"
    t.index ["user_id", "renewal_date"], name: "index_subscriptions_on_user_id_and_renewal_date"
    t.index ["user_id", "status"], name: "index_subscriptions_on_user_id_and_status"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "currency", limit: 10, default: "INR"
    t.datetime "deleted_at", precision: nil
    t.string "email", limit: 255, null: false
    t.string "name", limit: 100, null: false
    t.boolean "notifications_enabled", default: true
    t.string "password_digest", limit: 255, null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "reminder_logs", "subscriptions"
  add_foreign_key "reminder_logs", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "subscriptions", "categories"
  add_foreign_key "subscriptions", "users"
end
