class Image
  
  attr_accessor :source_width, :source_height
  attr_accessor :desired_width, :device_pixel_ratio
  attr_reader :attribute_width

  def call_width
    source_width
  end

  def call_height
    source_height
  end

  def attribute_height
    source_height
  end

  def request params
    @attribute_width = params[:width]
  end

end

