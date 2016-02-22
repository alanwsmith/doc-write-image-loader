class SizeFinder

  attr_accessor :window_inner_width, :window_inner_height
  attr_accessor :styles

  def load_basic_tests
    @styles = {
    	"basic" => [
    	  { 
    	  	break_point: 0,
    	  	image_width: 200
    	  },
    	  {
    	  	break_point: 500,
    	  	image_width: 400
        },
        {
        	break_point: 900,
        	image_width: 800
        }
    	]
    }
  end

  def request_width style
    if window_inner_width.to_i > 900
      @styles[style][2][:image_width]
    elsif window_inner_width.to_i > 400
      @styles[style][1][:image_width]
    end
  end

end

