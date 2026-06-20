class ApplicationController < ActionController::API
  rescue_from StandardError do |e|
    Rails.logger.error("[#{self.class.name}] Unhandled error: #{e.message}")
    render json: { success: false, errors: ["An unexpected error occurred. Please try again."] },
           status: :internal_server_error
  end

  private

  def current_user
    return nil unless session[:user_id]

    @current_user ||= User.active.find_by(id: session[:user_id])
  end

  def require_auth
    render_error(["Not authenticated"], :unauthorized) unless current_user
  end

  def render_success(data)
    render json: { success: true, data: data }
  end

  def render_error(errors, status = :unprocessable_entity)
    render json: { success: false, errors: Array(errors) }, status: status
  end
end
