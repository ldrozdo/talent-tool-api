require 'rails_helper'

RSpec.describe 'Languages API', type: :request do
  # initialize test data
  let!(:languages) { create_list(:language, 10) }
  let(:language_id) { languages.first.id }
  let(:headers) { valid_headers }


  # Test suite for GET /languages
  describe 'GET /languages' do
    # make HTTP get request before each example
    before { get '/languages', params: {}, headers: headers }

    it 'returns languages' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /languages/:id
  describe 'GET /languages/:id' do
    before { get "/languages/#{language_id}" , params: {}, headers: headers}

    context 'when the record exists' do
      it 'returns the language' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(language_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:language_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Language/)
      end
    end
  end

  # Test suite for POST /languages
  describe 'POST /languages' do
    # valid payload
    let(:valid_attributes) do
      { name: 'Magic language'}.to_json
    end

    context 'when the request is valid' do
      before { post '/languages', params: valid_attributes, headers: headers }

      it 'creates a language' do
        expect(json['name']).to eq('Magic language')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/languages', params: {}, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  # Test suite for PUT /languages/:id
  describe 'PUT /languages/:id' do
    let(:valid_attributes) { { name: 'Czechenglish' }.to_json }

    context 'when the record exists' do
      before { put "/languages/#{language_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /languages/:id
  describe 'DELETE /languages/:id' do
    before { delete "/languages/#{language_id}" , params: {}, headers: headers}

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
