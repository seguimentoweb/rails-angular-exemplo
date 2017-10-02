class ProductController < ApplicationController

    def index 
        @products = Product.all

        respond_to do |format|
            format.json { render json: @products }
        end
    end
    
    def create 
        @product = Product.create(product_params)

        respond_to do |format|
            format.json { render json: @product }
        end
    end


    private
        def product_params
            params.require(:product).permit(:name, :price, :quantity)
        end
end
