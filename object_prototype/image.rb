class Image
  
  attr_accessor :source_width, :source_height
  attr_accessor :device_pixel_ratio
  attr_reader :call_width

  def call_height
    source_width * ratio 
  end

  def attribute_height
    call_height / device_pixel_ratio
  end

  def attribute_width
    call_width / device_pixel_ratio
  end

  def request params
    @call_width = params[:width] * device_pixel_ratio
  end
  
  def ratio
    source_height.to_f / source_width.to_f
  end

end

