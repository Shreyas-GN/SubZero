require 'rails_helper'

RSpec.describe AuthService, type: :model do
  describe ".register" do
    let(:valid_params) do
      { name: "Alice", email: "alice@example.com", password: "password123",
        password_confirmation: "password123", currency: "USD" }
    end

    it "creates a user and returns success" do
      result = AuthService.register(valid_params)
      expect(result[:success]).to be true
      expect(result[:data]).to be_a(User)
      expect(result[:errors]).to be_empty
    end

    it "lowercases and strips the email" do
      result = AuthService.register(valid_params.merge(email: "  ALICE@EXAMPLE.COM  "))
      expect(result[:data].email).to eq("alice@example.com")
    end

    it "defaults currency to INR when not provided" do
      result = AuthService.register(valid_params.except(:currency))
      expect(result[:data].currency).to eq("INR")
    end

    it "returns failure with errors for an invalid user" do
      result = AuthService.register(valid_params.merge(email: "bad-email"))
      expect(result[:success]).to be false
      expect(result[:data]).to be_nil
      expect(result[:errors]).not_to be_empty
    end

    it "returns failure on duplicate email" do
      create(:user, email: "alice@example.com")
      result = AuthService.register(valid_params)
      expect(result[:success]).to be false
      expect(result[:errors]).to include("Email has already been taken")
    end
  end

  describe ".authenticate" do
    let!(:user) { create(:user, email: "bob@example.com", password: "password123") }

    it "returns success and user on valid credentials" do
      result = AuthService.authenticate("bob@example.com", "password123")
      expect(result[:success]).to be true
      expect(result[:data]).to eq(user)
    end

    it "is case-insensitive for email" do
      result = AuthService.authenticate("BOB@EXAMPLE.COM", "password123")
      expect(result[:success]).to be true
    end

    it "returns failure on wrong password" do
      result = AuthService.authenticate("bob@example.com", "wrong")
      expect(result[:success]).to be false
      expect(result[:errors]).to include("Invalid email or password")
    end

    it "returns failure when user does not exist" do
      result = AuthService.authenticate("nobody@example.com", "password123")
      expect(result[:success]).to be false
    end

    it "returns failure for a soft-deleted user" do
      user.soft_delete
      result = AuthService.authenticate("bob@example.com", "password123")
      expect(result[:success]).to be false
    end
  end

  describe ".logout" do
    it "deletes the user_id key from the session and returns success" do
      session = { user_id: "some-uuid" }
      result = AuthService.logout(session)
      expect(result[:success]).to be true
      expect(session.key?(:user_id)).to be false
    end
  end
end
