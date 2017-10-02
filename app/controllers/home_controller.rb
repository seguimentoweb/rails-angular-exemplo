class HomeController < ApplicationController
  def index
  end

  def hello 
    @str = { txt: 'Hello', name: 'Alexandre' }

    respond_to do |format| 
      format.json { render json: @str }
    end
  end
end
