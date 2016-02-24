class ImageTagBuilder
    
  attr_accessor :source_height, :source_width
  attr_accessor :viewport_height, :viewport_width
  attr_accessor :dpr
  attr_accessor :requested_width_in_pixels

  def attribute_height
    requested_width_in_pixels * source_height / source_width 
  end
  
  def attribute_width
    requested_width_in_pixels 
  end
 
  def call_height
    600 * dpr 
  end

  def call_width
    800 * dpr
  end

end
