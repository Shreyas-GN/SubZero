require 'rails_helper'

RSpec.describe "Api::V1::Auth", type: :request do
  describe "POST /api/v1/signup" do
    let(:valid_params) do
      { name: "Alice", email: "alice@example.com", password: "password123",
        password_confirmation: "password123", currency: "INR" }
    end

    it "creates a user, sets session, and returns the user JSON" do
      post "/api/v1/signup", params: valid_params

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["success"]).to be true
      expect(body["data"]).to include("email" => "alice@example.com", "currency" => "INR")
      expect(body["data"].keys).to match_array(%w[id name email currency notifications_enabled])
      expect(session[:user_id]).to be_present
    end

    it "returns 422 and error messages for invalid params" do
      post "/api/v1/signup", params: valid_params.merge(email: "bad")

      expect(response).to have_http_status(:unprocessable_entity)
      body = JSON.parse(response.body)
      expect(body["success"]).to be false
      expect(body["errors"]).not_to be_empty
    end

    it "returns 422 on duplicate email" do
      create(:user, email: "alice@example.com")
      post "/api/v1/signup", params: valid_params

      expect(response).to have_http_status(:unprocessable_entity)
      body = JSON.parse(response.body)
      expect(body["errors"]).to include("Email has already been taken")
    end
  end

  describe "POST /api/v1/login" do
    let!(:user) { create(:user, email: "bob@example.com", password: "password123") }

    it "authenticates and returns the user JSON" do
      post "/api/v1/login", params: { email: "bob@example.com", password: "password123" }

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["success"]).to be true
      expect(body["data"]["email"]).to eq("bob@example.com")
      expect(session[:user_id]).to eq(user.id)
    end

    it "returns 401 on wrong password" do
      post "/api/v1/login", params: { email: "bob@example.com", password: "wrong" }

      expect(response).to have_http_status(:unauthorized)
      body = JSON.parse(response.body)
      expect(body["success"]).to be false
      expect(body["errors"]).to include("Invalid email or password")
    end

    it "returns 401 for unknown email" do
      post "/api/v1/login", params: { email: "nobody@example.com", password: "password123" }

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "GET /api/v1/me" do
    let!(:user) { create(:user) }

    it "returns the current user when authenticated" do
      post "/api/v1/login", params: { email: user.email, password: "password123" }
      get "/api/v1/me"

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["data"]["id"]).to eq(user.id)
    end

    it "returns 401 when unauthenticated" do
      get "/api/v1/me"

      expect(response).to have_http_status(:unauthorized)
      body = JSON.parse(response.body)
      expect(body["success"]).to be false
    end
  end

  describe "DELETE /api/v1/logout" do
    let!(:user) { create(:user) }

    it "clears the session and returns success" do
      post "/api/v1/login", params: { email: user.email, password: "password123" }
      delete "/api/v1/logout"

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["success"]).to be true
    end

    it "returns 401 when not logged in" do
      delete "/api/v1/logout"
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
