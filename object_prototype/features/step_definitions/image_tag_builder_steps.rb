Given(/^I have an ImageTagBuilder$/) do
  @img_tag_builder = ImageTagBuilder.new 
end

Given(/^Viewport: (\d+)x(\d+) \- DPR: (\d+) \- Source: (\d+)x(\d+)$/) do |view_width, view_height, dpr, source_width, source_height|
  @img_tag_builder = ImageTagBuilder.new_with(
    window_inner_width: view_width.to_i, 
    window_inner_height: view_height.to_i, 
    device_pixel_ratio: dpr.to_i,
    source_width: source_width.to_i,
    source_height: source_height.to_i
  )
end

Given(/^a type of (.*?)$/) do |type|
  @img_tag_builder.image_type = type
end

Then(/^the width attribute should be (x?)(\d+)$/) do |skip, width|
  unless skip.eql? "x"
    expect(@img_tag_builder.attribute_width).to eq(width.to_i)
  else
  	1
  end
end

Then(/^the height attribute should be (x?)(\d+)$/) do |skip, height|
  unless skip.eql? "x"
    expect(@img_tag_builder.attribute_height).to eq(height.to_i)
  else
  	1
  end
end

Then(/^the image call width should be (x?)(\d+)$/) do |skip, width|
  unless skip.eql? "x"
    expect(@img_tag_builder.image_call_width).to eq(width.to_i)
  else
  	1
  end
end

Then(/^the image call height should be (x?)(\d+)$/) do |skip, height|
  unless skip.eql? "x"
    expect(@img_tag_builder.image_call_height).to eq(height.to_i)
  else
  	1
  end
end

