class AuthService
  def self.register(params)
    user = User.new(
      name: params[:name],
      email: params[:email]&.downcase&.strip,
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      currency: params[:currency] || "INR"
    )

    begin
      if user.save
        { success: true, data: user, errors: [] }
      else
        { success: false, data: nil, errors: user.errors.full_messages }
      end
    rescue ActiveRecord::RecordNotUnique
      { success: false, data: nil, errors: ["Email has already been taken"] }
    rescue StandardError => e
      Rails.logger.error("AuthService#register failed: #{e.message}")
      { success: false, data: nil, errors: ["Registration failed. Please try again."] }
    end
  end

  def self.authenticate(email, password)
    begin
      user = User.active.find_by(email: email&.downcase&.strip)

      if user&.authenticate(password)
        { success: true, data: user, errors: [] }
      else
        { success: false, data: nil, errors: ["Invalid email or password"] }
      end
    rescue StandardError => e
      Rails.logger.error("AuthService#authenticate failed: #{e.message}")
      { success: false, data: nil, errors: ["Authentication failed. Please try again."] }
    end
  end

  def self.logout(session)
    begin
      session.delete(:user_id)
      { success: true, data: nil, errors: [] }
    rescue StandardError => e
      Rails.logger.error("AuthService#logout failed: #{e.message}")
      { success: false, data: nil, errors: ["Logout failed. Please try again."] }
    end
  end
end
