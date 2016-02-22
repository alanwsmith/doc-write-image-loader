class ImageTagBuilder
 
  attr_accessor :image_type
  attr_accessor :source_height, :source_width
  attr_accessor :window_device_pixel_ratio, :window_inner_width, :window_inner_height 

  def initialize
    @image = Image.new()
  end

  def source_height= height
    @image.source_height = height
    @source_height = height 
  end

  def source_width= width
    @image.source_width = width
    @source_width = width
  end

  def window_device_pixel_ratio= dpr
    @image.device_pixel_ratio = dpr
    @window_device_pixel_ratio = dpr
  end

  def max_attribute_width
    if window_inner_width > 900
    	800
    elsif window_inner_width > 500
    	400
    else
    	200
    end
  end

  def max_attribute_height
    if window_inner_width > 900
    	600
    elsif window_inner_width > 500
    	300
    else
    	150
    end
  end

  def image_call_width
    attribute_width * window_device_pixel_ratio
  end

  def image_call_height
    attribute_height * window_device_pixel_ratio
  end

  def attribute_width
    @image.request_width(max_attribute_width)
    @image.attribute_width
  end

  def attribute_height
    if (source_height / window_device_pixel_ratio) > max_attribute_height 
      max_attribute_height	
    else
    	source_height / window_device_pixel_ratio
    end
  end

end

