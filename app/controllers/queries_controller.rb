class QueriesController < ApplicationController
  before_action :set_query, only: [:show, :update, :destroy]

  def index
      @queries = Query.all
      json_response(@queries)
  end

  def show
    json_response(@query)
  end

  def update
    @query.update(query_params)
    head :no_content
  end

  def create
    @query = Query.create!(query_params)
    json_response(@query, :created)
  end

  def destroy
    @query.destroy
    head :no_content
  end

  private
  def query_params
    # whitelist params
    params.permit(:name, :text_of_query, :user_id)
  end

  def set_query
    @query = Query.find(params[:id])
  end

end
