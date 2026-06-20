class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAILER_FROM", "SubZero <noreply@subzero.app>")
  layout "mailer"
end
