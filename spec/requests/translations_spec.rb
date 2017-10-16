# app/requests/items_spec.rb
require 'rails_helper'

RSpec.describe 'Translations API' do
  # Initialize the test data
  let!(:category) { create(:category) }
  let!(:language) { create(:language) }
  let!(:translations) { create_list(:translation, 20, language_id: language.id, category_id: category_id) }
  let(:category_id) { category.id }
  let(:language_id) { language.id }
  let(:id) { translations.first.id }
  let(:headers) { valid_headers }

  describe 'GET /categories/:category_id/translations' do
    before { get "/categories/#{category_id}/translations" , params: {}, headers: headers}

    context 'when translation exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all translations for category' do
        expect(json.size).to eq(20)
      end
    end
  end

  describe 'GET /translations/:id' do
    before { get "/translations/#{id}" , params: {}, headers: headers}

    context 'when translation item exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the item' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when translation item does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Translation/)
      end
    end
  end

  describe 'POST /categories/:category_id/languages/:language_id/translations' do
    let(:valid_attributes) do
      { translated_query: 'Vamos a la playa',language_id: 1, category_id: 1 }.to_json
    end
    let(:invalid_attributes) do
      { language_id: 1, category_id: 1 }.to_json
    end

    context 'when request attributes are valid' do
      before { post "/categories/#{category_id}/languages/#{language_id}/translations", params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/categories/#{category_id}/languages/#{language_id}/translations", params: invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Translated query can't be blank/)
      end
    end
  end


  describe 'PUT /translations/:id' do
    let(:valid_attributes) { { translated_query: 'Vamos a la playa' }.to_json }

    before { put "/translations/#{id}", params: valid_attributes, headers: headers }

    context 'when item exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the item' do
        updated_item = Translation.find(id)
        expect(updated_item.translated_query).to match(/Vamos a la playa/)
      end
    end

    context 'when the item does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Translation/)
      end
    end
  end

  describe 'DELETE /translations/:id' do
    before { delete "/translations/#{id}" , params: {}, headers: headers}

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
