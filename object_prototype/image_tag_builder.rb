class ImageTagBuilder
 
  attr_accessor :image_type
  attr_accessor :window_device_pixel_ratio, :window_inner_width, :window_inner_height 

  def initialize
    @image = Image.new()
    @size_finder = SizeFinder.new()
  end

  def source_height= height
    @image.source_height = height
  end

  def source_height
    @image.source_height
  end

  def source_width= width
    @image.source_width = width
  end
  
  def source_width
    @image.source_width
  end

  def window_device_pixel_ratio= dpr
    @image.device_pixel_ratio = dpr
    @window_device_pixel_ratio = dpr
  end

  def window_inner_width= width
    @window_inner_width = width
    @size_finder.window_inner_width = width
  end

  def window_inner_height= height
    @window_inner_height = height
    @size_finder.window_inner_height = height
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

  def image_call_width
    @image.request_width(max_attribute_width)
    @image.call_width
  end

  def image_call_height
    @image.request_width(max_attribute_width)
    @image.call_height
  end

  def attribute_width
    @image.request_width(max_attribute_width)
    @image.attribute_width
  end

  def attribute_height
    @image.request_width(max_attribute_width)
    @image.attribute_height
  end

end

