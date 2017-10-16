require 'rails_helper'

RSpec.describe 'Queries API', type: :request do
  # initialize test data
  let!(:user) { create(:user) }
  let!(:queries) { create_list(:query, 10, user_id: user_id) }
  let(:user_id) { user.id }
  let(:query_id) { queries.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /queries
  describe 'GET /queries' do
    # make HTTP get request before each example
    before { get '/queries', params: {}, headers: headers}

    it 'returns queries' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /queries/:id
  describe 'GET /queries/:id' do
    before { get "/queries/#{query_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the query' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(query_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:query_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Query/)
      end
    end
  end

  # Test suite for POST /queries
  describe 'POST /queries' do
    # valid payload
    let(:valid_attributes) do
      { name: 'Some query', text_of_query: 'Java AND SQL', user_id: 1 }.to_json
    end
    let(:invalid_attributes) do
      { text_of_query: 'Java AND SQL', user_id: 1 }.to_json
    end

    context 'when the request is valid' do
      before { post '/queries', params: valid_attributes , headers: headers}

      it 'creates a query' do
        expect(json['name']).to eq('Some query')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/queries', params: invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  # Test suite for PUT /queries/:id
  describe 'PUT /queries/:id' do
    let(:valid_attributes) { { name: 'Another query' }.to_json }

    context 'when the record exists' do
      before { put "/queries/#{query_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /queries/:id
  describe 'DELETE /queries/:id' do
    before { delete "/queries/#{query_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
