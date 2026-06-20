require 'rails_helper'

RSpec.describe "Api::V1::Subscriptions", type: :request do
  let(:user) { create(:user) }

  let(:valid_params) do
    { name: "Spotify", amount: 119, billing_cycle: "monthly",
      renewal_date: (Date.current + 10.days).to_s, status: "active" }
  end

  before do
    post "/api/v1/login", params: { email: user.email, password: "password123" }
  end

  describe "GET /api/v1/subscriptions" do
    it "returns 200 and the user's active subscriptions" do
      create(:subscription, user: user, name: "Netflix")
      create(:subscription, :soft_deleted, user: user, name: "Ghost")

      get "/api/v1/subscriptions"

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["success"]).to be true
      names = body["data"].map { |s| s["name"] }
      expect(names).to include("Netflix")
      expect(names).not_to include("Ghost")
    end

    it "returns 401 when unauthenticated" do
      delete "/api/v1/logout"
      get "/api/v1/subscriptions"

      expect(response).to have_http_status(:unauthorized)
      body = JSON.parse(response.body)
      expect(body["success"]).to be false
    end
  end

  describe "GET /api/v1/subscriptions/:id" do
    let!(:subscription) { create(:subscription, user: user) }

    it "returns the subscription with the full JSON shape" do
      get "/api/v1/subscriptions/#{subscription.id}"

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["success"]).to be true
      data = body["data"]
      expect(data.keys).to include("id", "name", "amount", "billing_cycle", "renewal_date",
                                   "status", "notes", "website_url", "category", "created_at")
      expect(data["id"]).to eq(subscription.id)
    end

    it "returns 401 when unauthenticated" do
      delete "/api/v1/logout"
      get "/api/v1/subscriptions/#{subscription.id}"

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "POST /api/v1/subscriptions" do
    it "creates a subscription and returns 200 with the full shape" do
      expect {
        post "/api/v1/subscriptions", params: valid_params
      }.to change(Subscription, :count).by(1)

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["success"]).to be true
      expect(body["data"]["name"]).to eq("Spotify")
      expect(body["data"]["billing_cycle"]).to eq("monthly")
    end

    it "returns 422 with errors for invalid params" do
      post "/api/v1/subscriptions", params: valid_params.merge(amount: -1)

      expect(response).to have_http_status(:unprocessable_entity)
      body = JSON.parse(response.body)
      expect(body["success"]).to be false
      expect(body["errors"]).not_to be_empty
    end

    it "returns 401 when unauthenticated" do
      delete "/api/v1/logout"
      post "/api/v1/subscriptions", params: valid_params

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "PATCH /api/v1/subscriptions/:id" do
    let!(:subscription) { create(:subscription, user: user) }

    it "updates the subscription and returns 200" do
      patch "/api/v1/subscriptions/#{subscription.id}", params: { name: "Netflix Premium" }

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["success"]).to be true
      expect(body["data"]["name"]).to eq("Netflix Premium")
    end

    it "returns 404 for another user's subscription" do
      other = create(:subscription, user: create(:user))
      patch "/api/v1/subscriptions/#{other.id}", params: { name: "Hack" }

      expect(response).to have_http_status(:not_found)
    end

    it "returns 401 when unauthenticated" do
      delete "/api/v1/logout"
      patch "/api/v1/subscriptions/#{subscription.id}", params: { name: "x" }

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "DELETE /api/v1/subscriptions/:id" do
    let!(:subscription) { create(:subscription, user: user) }

    it "soft-deletes the subscription and returns 200" do
      delete "/api/v1/subscriptions/#{subscription.id}"

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["success"]).to be true
      expect(body["data"]).to be_nil
      expect(subscription.reload.deleted_at).to be_present
    end

    it "returns 404 for another user's subscription" do
      other = create(:subscription, user: create(:user))
      delete "/api/v1/subscriptions/#{other.id}"

      expect(response).to have_http_status(:not_found)
    end

    it "returns 401 when unauthenticated" do
      delete "/api/v1/logout"
      delete "/api/v1/subscriptions/#{subscription.id}"

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
