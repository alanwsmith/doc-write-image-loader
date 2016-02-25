class ImageTagBuilder
    
  attr_accessor :source_height, :source_width
  attr_accessor :viewport_height, :viewport_width
  attr_accessor :dpr
  attr_accessor :requested_width_in_pixels

  def attribute_height
    attribute_width * source_height / source_width 
  end
  
  def attribute_width
    [requested_width_in_pixels, (source_width / dpr)].min
  end
 
  def call_height
    attribute_height * dpr 
  end

  def call_width
    attribute_width * dpr
  end

  def requested_width_in_pct= pct
    @requested_width_in_pixels = viewport_width * pct / 100
  end

  def requested_height_in_pct= pct
    @requested_width_in_pixels = viewport_height * pct / 100 * viewport_width / viewport_height
  end
end
