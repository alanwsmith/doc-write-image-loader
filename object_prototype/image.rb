class Image
  
  attr_accessor :source_width, :source_height
  attr_accessor :device_pixel_ratio
  attr_reader :call_width

  def call_height
    source_width * ( source_height.to_f / source_width.to_f )
  end

  def attribute_height
    source_height
  end

  def attribute_width
    source_width
  end

  def request params
    @call_width = params[:width] 
  end

end

