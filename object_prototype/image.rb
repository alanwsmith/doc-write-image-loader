class Image
  
  attr_accessor :source_width, :source_height
  attr_accessor :desired_width, :device_pixel_ratio

  def call_width
    source_width
  end

  def call_height
    source_height
  end

  def attribute_width
    source_width
  end

  def attribute_height
    source_height
  end

end

