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
        	break_point: 900,
        	image_width: 800
        }
    	]
    }
  end

  def request_width style
    @styles[style][1][:image_width]
  end

end

