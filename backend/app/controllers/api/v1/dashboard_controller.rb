module Api
  module V1
    class DashboardController < ApplicationController
      before_action :require_auth

      def index
        render_success(DashboardService.summary(current_user))
      rescue StandardError
        render_error(["Failed to load dashboard. Please try again."], :internal_server_error)
      end
    end
  end
end
