module Api
  module V1
    class AuthController < ApplicationController
      before_action :require_auth, only: [:me, :logout]

      def signup
        result = AuthService.register(signup_params)
        return render_error(result[:errors], :unprocessable_entity) unless result[:success]

        session[:user_id] = result[:data].id
        render_success(user_json(result[:data]))
      end

      def login
        result = AuthService.authenticate(params[:email], params[:password])
        return render_error(result[:errors], :unauthorized) unless result[:success]

        session[:user_id] = result[:data].id
        render_success(user_json(result[:data]))
      end

      def logout
        result = AuthService.logout(session)
        return render_error(result[:errors]) unless result[:success]

        render_success(nil)
      end

      def me
        render_success(user_json(current_user))
      end

      private

      def signup_params
        params.permit(:name, :email, :password, :password_confirmation, :currency)
      end

      def user_json(user)
        {
          id: user.id,
          name: user.name,
          email: user.email,
          currency: user.currency,
          notifications_enabled: user.notifications_enabled
        }
      end
    end
  end
end
