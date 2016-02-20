class ImageTagBuilder
 
  attr_accessor :image_type
  attr_accessor :source_height, :source_width
  attr_accessor :window_device_pixel_ratio, :window_inner_width, :window_inner_height 

  def max_attribute_width
    if window_inner_width > 900
    	800
    else
    	400
    end
  end

  def max_attribute_height
    if window_inner_width > 900
    	600
    else
    	300
    end
  end

  def image_call_width
    attribute_width * window_device_pixel_ratio
  end

  def image_call_height
    attribute_height * window_device_pixel_ratio
  end

  def attribute_width
    if (source_width / window_device_pixel_ratio) > max_attribute_width
    	max_attribute_width
    else 
    	source_width / window_device_pixel_ratio
    end
  end

  def attribute_height
    if adjust_size(source_height / window_device_pixel_ratio) > max_attribute_height 
      max_attribute_height	
    else
    	adjust_size(source_height / window_device_pixel_ratio)
    end
  end

  def adjust_size number
    if window_inner_width < 900
      number / 2
    else
      number
    end

  end
end

