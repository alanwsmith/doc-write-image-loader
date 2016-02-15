class ImageTagBuilder
 
  attr_accessor :image_type
  attr_accessor :source_height, :source_width
  attr_accessor :window_device_pixel_ratio, :window_inner_width 

  def image_call_width
    source_width
  end

  def image_call_height
    source_height
  end

  def attribute_width
    source_width / window_device_pixel_ratio
  end

  def attribute_height
    source_height / window_device_pixel_ratio
  end

end
