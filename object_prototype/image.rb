class Image

  # The approach is to base everything off the call width. 
  # Even when a height is requested, it's translated into a
  # base call_width so the rest of the math only has
  # to be done in one way.

  attr_accessor :call_width, :device_pixel_ratio, :source_width, :source_height

  def attribute_height
    call_height / device_pixel_ratio
  end

  def attribute_width
    call_width / device_pixel_ratio
  end

  def call_height
    call_width * ratio 
  end

  def ratio
    source_height.to_f / source_width.to_f
  end

  def request_width width
    @call_width = width * device_pixel_ratio
  end

end

