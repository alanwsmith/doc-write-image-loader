class Image

  # The approach is to base everything off the attribute
  # width. If the overall request needs to be a height, 
  # the SizeFinder will convert it to a widt. 

  # Values are always retured as integers using a "floor" mechanic
  # instead of rounding. (e.g. "600.75" becomes "600" instead of
  # "601". This way, a simple crop can be applied to the source
  # pixels instead of upsizing by one pixel. 

  attr_accessor :attribute_width, :device_pixel_ratio, :source_width, :source_height

  def initialize_with params
    initialize
    @source_width = params[:source_width].to_i 
    @source_height = params[:source_height].to_i 
    @device_pixel_ratio = params[:device_pixel_ratio].to_i
  end

  def self.new_with params
    forerunner = allocate
    forerunner.send(:initialize_with, params)
    forerunner
  end

  def attribute_height
    (attribute_width * ratio).to_i
  end

  def call_height
    attribute_height * device_pixel_ratio
  end

  def call_width
    attribute_width * device_pixel_ratio
  end

  def ratio
    source_height.to_f / source_width.to_f
  end
  
  def set_requested_width width
    # Recude size to source width if the quest is too big.
    @attribute_width = [width, source_width / device_pixel_ratio ].min
  end

end

