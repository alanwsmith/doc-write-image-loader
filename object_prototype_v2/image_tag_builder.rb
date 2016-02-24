class ImageTagBuilder
    
  attr_accessor :source_height, :source_width
  attr_accessor :viewport_height, :viewport_width
  attr_accessor :dpr
  attr_accessor :requested_with_in_pixels

  def attribute_height
    600
  end
  
  def attribute_width
    800
  end
 
  def call_height
    600 
  end

  def call_width
    800
  end

end
