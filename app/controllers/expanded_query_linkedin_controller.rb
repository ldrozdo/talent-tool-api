class ExpandedQueryLinkedinController < ApplicationController
  before_action :set_query, only: [:show]

  def show
    @linkedin_form = @query.expanded_query_linkedin
    query_hash = {:query => @linkedin_form}
    # puts JSON.generate(my_hash)
    json_response(query_hash)
  end


  def set_query
    @query = Query.find(params[:id])
  end

end
