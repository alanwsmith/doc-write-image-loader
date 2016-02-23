class ImageTagBuilder
 
  attr_accessor :image_type

  def initialize_with params

    @size_finder = SizeFinder.new_with(params)
    @size_finder.load_basic_tests

    @image = Image.new_with(params)

    @image.set_requested_width(@size_finder.request_width "basic")
  end

  def self.new_with params
    forerunner = allocate
    forerunner.send(:initialize_with, params)
    forerunner
  end

  def image_call_width
    @image.call_width
  end

  def image_call_height
    @image.call_height
  end

  def attribute_width
    @image.attribute_width
  end

  def attribute_height
    @image.attribute_height
  end

end

