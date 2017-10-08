class QueryLanguagesController < ApplicationController
  before_action :set_query, only: [:create, :index]
  before_action :set_language, only: [:create]
  before_action :set_query_language, only: [:show, :destroy]

  def index
    json_response(@query.query_languages)
  end

  def show
    json_response(@query_language)
  end

  def create
    @query.query_languages.create!(create_query_lang_params)
    json_response(@query, :created)
  end

  def destroy
    @query_language.destroy
    head :no_content
  end

  private
  def create_query_lang_params
    params.permit(:language_id, :query_id)
  end

  def set_query
    @query = Query.find(params[:query_id])
  end

  def set_language
    @language = Language.find(params[:language_id])
  end

  def set_query_language
    @query_language = QueryLanguage.find(params[:id])
  end
end
