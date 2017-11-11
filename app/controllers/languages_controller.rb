class LanguagesController < ApplicationController
  skip_before_action :authorize_request, only: [:index]
  before_action :set_language, only: [:show, :update, :destroy]

  def index
    @languages = Language.all
    json_response(@languages)
  end

  def show
    json_response(@language)
  end

  def update
    @language.update!(language_params)
    json_response(@language)
  end

  def create
    @language = Language.create!(language_params)
    json_response(@language, :created)
  end

  def destroy
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
