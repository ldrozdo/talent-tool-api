require 'rails_helper'

RSpec.describe AuthorizeApiRequest do
  # Create test user
  let(:user) { create(:user) }
  # Mock `Authorization` header
  let(:header) { { 'Authorization' => token_generator() } }
  # Invalid request subject
  subject(:invalid_request_obj) { described_class.new({}) }
  # Valid request subject
  subject(:request_obj) { described_class.new(header) }

  # Test Suite for AuthorizeApiRequest#call
  # This is our entry point into the service class
  describe '#call' do
    # returns user object when request is valid
    context 'when valid request' do
      it 'returns user object' do
        result = request_obj.call
        expect(result[:user].username).to eq(user.username)
      end
    end

    # returns error message when invalid request
    context 'when invalid request' do
      context 'when missing token' do
        it 'raises a MissingToken error' do
          expect { invalid_request_obj.call }
            .to raise_error(ExceptionHandler::MissingToken, 'Missing token')
        end
      end

      context 'when invalid token' do
        subject(:invalid_request_obj) do
          # custom helper method `token_generator`
          described_class.new('Authorization' => invalid_token_generator())
        end

        it 'raises an InvalidToken error' do
          expect { invalid_request_obj.call }
            .to raise_error(ExceptionHandler::InvalidToken)
        end
      end
    end
  end
end
