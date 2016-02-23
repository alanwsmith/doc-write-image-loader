class ImageTagBuilder
 
  attr_accessor :image_type
  attr_accessor :window_device_pixel_ratio, :window_inner_width, :window_inner_height


  def initialize_with params
    @window_inner_width = params[:window_inner_width]
    @window_inner_height = params[:window_inner_height]
    @window_device_pixel_ratio = params[:window_device_pixel_ratio]

    @size_finder = SizeFinder.new_with(params)
    @size_finder.load_basic_tests

    @image = Image.new_with(
      source_width: params[:source_width].to_i, 
      source_height: params[:source_height].to_i, 
      device_pixel_ratio: params[:window_device_pixel_ratio].to_i
    )

    @image.device_pixel_ratio = params[:window_device_pixel_ratio].to_i
  end

  def self.new_with params
    forerunner = allocate
    forerunner.send(:initialize_with, params)
    forerunner
  end


  def max_attribute_width
    @size_finder.request_width "basic"
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

