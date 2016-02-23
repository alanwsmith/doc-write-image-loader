class SizeFinder

  attr_accessor :window_inner_width, :window_inner_height
  attr_accessor :styles

  def initialize_with params
    @window_inner_width = params[:window_inner_width]
    @window_inner_height = params[:window_inner_height]
    
    @styles = {
    	"basic" => [
    	  { break_point: 0, image_width: 200 },
    	  { break_point: 500, image_width: 400 },
        { break_point: 900, image_width: 800 }
    	],
    	"by_pct" => [
    	  { break_point: 0, image_width: "80%" },
    	  { break_point: 500, image_width: "70%" },
        { break_point: 900, image_width: "60%" }
    	]
    }
  end

  def self.new_with params
    forerunner = allocate
    forerunner.send(:initialize_with, params)
    forerunner 
  end

  def request_width_for_style style
    attr_width = 0
    @styles[style].each do |config|
      if window_inner_width.to_i > config[:break_point]
        if config[:image_width] =~ /\%/
        	attr_width = config[:image_width].sub(/\%/, "").to_i * window_inner_width / 100
        else
          attr_width = config[:image_width]
        end
      end
    end
    attr_width
  end

end

