class Image
  
  attr_accessor :call_width, :device_pixel_ratio, :source_width, :source_height

  def attribute_height
    call_height / device_pixel_ratio
  end

  def attribute_width
    call_width / device_pixel_ratio
  end

  def call_height
    source_width * ratio 
  end

  def ratio
    source_height.to_f / source_width.to_f
  end

  def request_width width
    @call_width = width * device_pixel_ratio
  end

end

