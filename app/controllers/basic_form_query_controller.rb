class BasicFormQueryController < ApplicationController
  before_action :set_query, only: [:show]

  def show
    @basic_form = @query.build_simple_query
    query_hash = {:query => @basic_form}
    json_response(query_hash)
  end


  def set_query
    @query = Query.find(params[:id])
  end
end
