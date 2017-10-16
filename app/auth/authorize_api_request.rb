class AuthorizeApiRequest
  def initialize(headers = {})
    @headers = headers
  end

  # Service entry point - return valid user object
  def call
    {
      user: user
    }
  end

  private

  attr_reader :headers

  def user
    # check if user is in the database, if not, create him
    searched_username = decoded_auth_token[:preferred_username]
    user_role = decoded_auth_token[:realm_access][:roles].grep /^app_/
    if searched_username
      @user = User.find_by(username: searched_username)
    end
    if @user.present?
      @user.role = user_role
    end
    if !@user.present?
      @user = User.new
      @user.username = searched_username
      @user.role = user_role
    end
    @user.save
    @user
  end

  # decode authentication token
  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  # check for token in `Authorization` header
  def http_auth_header
    if headers['Authorization'].present?
      return headers['Authorization'].split(' ').last
    end
      raise(ExceptionHandler::MissingToken, Message.missing_token)
  end
end
