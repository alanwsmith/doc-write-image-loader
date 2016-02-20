class ImageTagBuilder
 
  attr_accessor :image_type
  attr_accessor :source_height, :source_width
  attr_accessor :window_device_pixel_ratio, :window_inner_width, :window_inner_height 

  def image_call_width
    adjust_size(source_width)
  end

  def image_call_height
    adjust_size(source_height)
  end

  def attribute_width
    if adjust_size(source_width / window_device_pixel_ratio) > 800
    	800
    else 
      adjust_size(source_width / window_device_pixel_ratio)
    end
  end

  def attribute_height
    adjust_size(source_height / window_device_pixel_ratio)
  end

  def adjust_size number
    if window_inner_width < 900
      number / 2
    else
      number
    end

  end
end

