class TermsController < ApplicationController
  skip_before_action :authorize_request, only: [:index]
  before_action :set_query, only: [:create]
  before_action :set_category, only: [:create]
  before_action :set_term, only: [:show, :update, :destroy]

  def index
    # json_response(@query.terms)
    @terms = Term.all
    json_response(@terms)
  end

  def show
    json_response(@term)
  end

  def create
    @term = @query.terms.create!(create_term_params)
    json_response(@term, :created)
  end

  def update
    @term.update(update_term_params)
    head :no_content
  end

  def destroy
    @term.destroy
    head :no_content
  end

  private
  def create_term_params
    params.permit(:operator, :category_id, :query_id)
  end

  private
  def update_term_params
    params.permit(:operator)
  end

  def set_query
    @query = Query.find(params[:query_id])
  end

  def set_category
    @category = Category.find(params[:category_id])
  end

  def set_term
    @term = Term.find(params[:id])
  end
end
