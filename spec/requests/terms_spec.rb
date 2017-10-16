# app/requests/items_spec.rb
require 'rails_helper'

RSpec.describe 'Terms API' do
  # Initialize the test data
  let!(:user) { create(:user) }
  let!(:query) { create(:query, user_id: user.id) }
  let!(:category) { create(:category) }
  let!(:terms) { create_list(:term, 20, query_id: query.id, category_id: category_id) }
  let(:category_id) { category.id }
  let(:query_id) { query.id }
  let(:user_id) { user.id }
  let(:id) { terms.first.id }
  let(:headers) { valid_headers }

  describe 'GET /queries/:query_id/terms' do
    before { get "/queries/#{query_id}/terms" , params: {}, headers: headers}

    context 'when term exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all terms for query' do
        expect(json.size).to eq(20)
      end
    end
  end

  describe 'GET /terms/:id' do
    before { get "/terms/#{id}", params: {}, headers: headers }

    context 'when term item exists' do
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
        expect(response.body).to match(/Couldn't find Term/)
      end
    end
  end

  # Test suite for PUT /todos/:todo_id/items
  describe 'POST /queries/:query_id/categories/:category_id/terms' do
    let(:valid_attributes) do
      { operator: 'AND',query_id: 1, category_id: 1 }.to_json 
    end

    context 'when request attributes are valid' do
      before { post "/queries/#{query_id}/categories/#{category_id}/terms", params: valid_attributes , headers: headers}

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an empty operator of term' do
      before { post "/queries/#{query_id}/categories/#{category_id}/terms", params: {}, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end

    end
  end

  # Test suite for PUT /todos/:todo_id/items/:id
  describe 'PUT /terms/:id' do
    let(:valid_attributes) { { operator: 'NOT' }.to_json }

    before { put "/terms/#{id}", params: valid_attributes , headers: headers}

    context 'when item exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the item' do
        updated_item = Term.find(id)
        expect(updated_item.operator).to match(/NOT/)
      end
    end

    context 'when the item does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Term/)
      end
    end
  end

  # Test suite for DELETE /todos/:id
  describe 'DELETE /terms/:id' do
    before { delete "/terms/#{id}" , params: {}, headers: headers}

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
