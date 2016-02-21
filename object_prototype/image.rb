class Image
  
  attr_accessor :source_width, :source_height
  attr_accessor :desired_width, :device_pixel_ratio
  attr_accessor :attribute_width
  attr_accessor :call_width, :call_height


  def call_height
    source_width * ( source_height.to_f / source_width.to_f )
  end

  def attribute_height
    source_height
  end

  def request params
    @call_width = params[:width] 
    @attribute_width = params[:width]
  end

end

