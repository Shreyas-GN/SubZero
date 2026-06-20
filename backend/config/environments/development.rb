require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = true
  config.eager_load = false
  config.consider_all_requests_local = true
  config.server_timing = true

  config.action_controller.perform_caching = false
  config.cache_store = :memory_store

  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.perform_caching = false
  config.action_mailer.default_url_options = { host: "localhost", port: 3000 }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address: ENV.fetch("MAILTRAP_HOST", "sandbox.smtp.mailtrap.io"),
    port: ENV.fetch("MAILTRAP_PORT", 2525),
    user_name: ENV.fetch("MAILTRAP_USERNAME", ""),
    password: ENV.fetch("MAILTRAP_PASSWORD", ""),
    authentication: :plain
  }

  config.active_support.deprecation = :log
  config.active_record.migration_error = :page_load
  config.active_record.verbose_query_logs = true
  config.active_record.query_log_tags_enabled = true
  config.active_job.verbose_enqueue_logs = true
  config.action_controller.raise_on_missing_callback_actions = true
end
