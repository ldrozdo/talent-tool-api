class CategoriesController < ApplicationController
  skip_before_action :authorize_request, only: [:index]
  before_action :set_category, only: [:show, :update, :destroy]

  def index
      @categories = Category.all
      json_response(@categories)
  end

  def show
    json_response(@category)
  end

  def update
    @category.update!(category_params)
    json_response(@category)
  end

  def create
    @category = Category.create!(category_params)
    json_response(@category, :created)
  end

  def destroy
    @category.destroy
    head :no_content
  end

  private
  def category_params
    # whitelist params
    params.permit(:name, :category_query)
  end

  def set_category
    @category = Category.find(params[:id])
  end

end
