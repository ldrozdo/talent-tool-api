class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]

  def index
      @categories = Category.all
      json_response(@categories)
  end

  def show
    # @category = Category.find(params[:id])
    # @translations = @category.translations
    # added_languages = @category.languages
    # @languages_for_add = Array.new
    # languages = Language.all
    # languages.each do |language|
    #   if (!added_languages.include? language)
    #     @languages_for_add << language
    #   end
    # end
    json_response(@category)
  end

  # def edit
  #   @category = Category.find(params[:id])
  # end

  def update
    # @category = Category.find(params[:id])
    #
    # if @category.update_attributes(category_params)
    #   redirect_to(:action => 'show', :id => @category.id)
    # else
    #   render 'edit'
    # end
    @category.update(category_params)
    head :no_content

  end

  # def new
  #   @category = Category.new
  # end

  def create
    # @category = Category.new(category_params)
    #
    # if @category.save
    #   redirect_to '/categories'
    # else
    #   render 'new'
    # end
    @category = Category.create!(category_params)
    json_response(@category, :created)
  end

  def destroy
    # Category.find(params[:id]).destroy
    # flash[:success] = "Category deleted"
    # redirect_to categories_path
    @category.destroy
    head :no_content
  end

  # private
  # def category_params
  #   params.require(:category).permit(:name, :category_query)
  # end

  private
  def category_params
    # whitelist params
    params.permit(:name, :category_query)
  end

  def set_category
    @category = Category.find(params[:id])
  end

end
