class Image

  # The approach is to base everything off the attribute
  # width.  Even when a height is requested, it's translated 
  # into a base call_width so the rest of the math only has
  # to be done in one way.

  # Values are always retured as integers using a "floor" mechanic
  # instead of rounding. (e.g. "600.75" becomes "600" instead of
  # "601". This way, a simple crop can be applied to the source
  # pixels instead of upsizing by one pixel. 

  # Because everything is based of width, requests for height
  # somtimes have 1 less pixel. (That's because the initial
  # height to width conversion may create an float which gets
  # rounded down to an integer. When the ratio is applied again
  # the height may have lost a pixel. I think it should only be
  # one at the most.

  # Worth pointing out that height isn't the only thing that
  # can get altered. Once the full feature list is implemented,
  # requests that are larger than the source will also to reduced.

  attr_accessor :attribute_width, :device_pixel_ratio, :source_width, :source_height

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
  
  def request_height height
    @attribute_width = (height * source_width) / source_height 
  end

  def request_width width
    # Recude size to source width if the quest is too big.
    @attribute_width = [width, source_width / device_pixel_ratio ].min
  end

end

