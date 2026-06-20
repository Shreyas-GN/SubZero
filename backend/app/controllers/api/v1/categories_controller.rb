module Api
  module V1
    class CategoriesController < ApplicationController
      before_action :require_auth

      def index
        categories = Category.order(:name).map { |c| { id: c.id, name: c.name, color: c.color } }
        render_success(categories)
      end
    end
  end
end
