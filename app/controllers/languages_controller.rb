class LanguagesController < ApplicationController
  before_action :set_language, only: [:show, :update, :destroy]

  def index
    @languages = Language.all
    json_response(@languages)
  end

  def show
    # @language = Language.find(params[:id])
    json_response(@language)
  end

  # def edit
  #   @language = Language.find(params[:id])
  # end

  def update
    # @language = Language.find(params[:id])
    # if @language.update_attributes(language_params)
    #   redirect_to(:action => 'show', :id => @language.id)
    # else
    #   render 'edit'
    # end
    @language.update(language_params)
    head :no_content
  end

  # def new
  #   @language = Language.new
  # end

  def create
    # @language = Language.new(language_params)
    # if @language.save
    #   redirect_to '/languages'
    # else
    #   render 'new'
    # end
    @language = Language.create!(language_params)
    json_response(@language, :created)
  end

  def destroy
    # Language.find(params[:id]).destroy
    # flash[:success] = "Language deleted"
    # redirect_to languages_path
    @language.destroy
    head :no_content
  end

  private
  def language_params
    params.permit(:name)
  end

  def set_language
    @language = Language.find(params[:id])
  end

end
