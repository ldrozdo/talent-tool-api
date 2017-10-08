# app/requests/items_spec.rb
require 'rails_helper'

RSpec.describe 'Query Languages API' do
  # Initialize the test data
  let!(:user) { create(:user) }
  let!(:query) { create(:query, user_id: user.id) }
  let!(:language) { create(:language) }
  let!(:query_languages) { create_list(:query_language, 20, query_id: query.id, language_id: language_id) }
  let(:language_id) { language.id }
  let(:query_id) { query.id }
  let(:user_id) { user.id }
  let(:id) { query_languages.first.id }

  describe 'GET /queries/:query_id/query_languages' do
    before { get "/queries/#{query_id}/query_languages" }

    context 'when query language exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all query languages for query' do
        expect(json.size).to eq(20)
      end
    end
  end

  describe 'GET /query_languages/:id' do
    before { get "/query_languages/#{id}" }

    context 'when query language item exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the item' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when term item does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find QueryLanguage/)
      end
    end
  end

  # Test suite for PUT /todos/:todo_id/items
  describe 'POST /queries/:query_id/languages/:language_id/query_languages' do
    let(:valid_attributes) { { query_id: 1, language_id: 1 } }

    context 'when request attributes are valid' do
      before { post "/queries/#{query_id}/languages/#{language_id}/query_languages", params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end
  end

  # Test suite for DELETE /todos/:id
  describe 'DELETE /query_languages/:id' do
    before { delete "/query_languages/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
