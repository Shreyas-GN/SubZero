module Api
  module V1
    class SubscriptionsController < ApplicationController
      before_action :require_auth

      def index
        subscriptions = SubscriptionService.list(current_user)
        render_success(subscriptions.map { |s| subscription_json(s) })
      end

      def show
        subscription = current_user.subscriptions.find_by(id: params[:id])
        return render_error(["Subscription not found"], :not_found) unless subscription

        render_success(subscription_json(subscription))
      end

      def create
        result = SubscriptionService.create(current_user, subscription_params)
        return render_error(result[:errors]) unless result[:success]

        render_success(subscription_json(result[:data]))
      end

      def update
        result = SubscriptionService.update(current_user, params[:id], subscription_params)
        return render_error(result[:errors], error_status(result)) unless result[:success]

        render_success(subscription_json(result[:data]))
      end

      def destroy
        result = SubscriptionService.destroy(current_user, params[:id])
        return render_error(result[:errors], error_status(result)) unless result[:success]

        render_success(nil)
      end

      private

      def subscription_params
        params.require(:subscription).permit(:name, :amount, :billing_cycle, :renewal_date, :status, :category_id, :notes, :website_url)
      end

      def error_status(result)
        result[:errors].include?("Subscription not found") ? :not_found : :unprocessable_entity
      end

      def subscription_json(subscription)
        {
          id: subscription.id,
          name: subscription.name,
          amount: subscription.amount,
          billing_cycle: subscription.billing_cycle,
          renewal_date: subscription.renewal_date,
          status: subscription.status,
          notes: subscription.notes,
          website_url: subscription.website_url,
          category: subscription.category && { id: subscription.category.id, name: subscription.category.name },
          created_at: subscription.created_at
        }
      end
    end
  end
end
