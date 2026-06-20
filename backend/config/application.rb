require_relative "boot"

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 8.1
    config.autoload_lib(ignore: %w[assets tasks])
    config.api_only = true
    config.time_zone = "UTC"

    config.active_job.queue_adapter = :sidekiq

    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid
    end

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, key: "_subzero_session"
  end
end
