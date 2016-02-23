Given(/^I have an ImageTagBuilder$/) do
  @i = ImageTagBuilder.new 
end

Given(/^Viewport: (\d+)x(\d+) \- DPR: (\d+) \- Source: (\d+)x(\d+)$/) do |view_width, view_height, dpr, source_width, source_height|
  @i = ImageTagBuilder.new_with(
    window_inner_width: view_width.to_i, 
    window_inner_height: view_height.to_i, 
    window_device_pixel_ratio: dpr.to_i,
    source_width: source_width.to_i,
    source_height: source_height.to_i
  )
end

Given(/^a viewport that's (\d+)x(\d+)$/) do |width, height|
  @i.window_inner_width = width.to_i
  @i.window_inner_height= height.to_i
end

Given(/^a window\.devicePixelRatio of (\d+)$/) do |ratio|
  @i.window_device_pixel_ratio = ratio.to_i
end

Given(/^a source image that's (\d+)x(\d+)$/) do |width, height|
  @i.source_width = width.to_i
  @i.source_height = height.to_i
end

Given(/^a type of (.*?)$/) do |type|
  @i.image_type = type
end

Then(/^the inner width should be (\d+)$/) do |width|
  expect(@i.window_inner_width).to eq(width.to_i)
end

Then(/^the inner height should be (\d+)$/) do |height|
  expect(@i.window_inner_height).to eq(height.to_i)
end

Then(/^the DPR should be (\d+)$/) do |dpr|
  expect(@i.window_device_pixel_ratio).to eq(dpr.to_i)
end

Then(/^the source image width should be (\d+)$/) do |width|
  expect(@i.source_width).to eq(width.to_i)
end

Then(/^the source image height should be (\d+)$/) do |height|
  expect(@i.source_height).to eq(height.to_i)
end

Then(/^the width attribute should be (x?)(\d+)$/) do |skip, width|
  unless skip.eql? "x"
    expect(@i.attribute_width).to eq(width.to_i)
  else
  	1
  end
end

Then(/^the height attribute should be (x?)(\d+)$/) do |skip, height|
  unless skip.eql? "x"
    expect(@i.attribute_height).to eq(height.to_i)
  else
  	1
  end
end

Then(/^the image call width should be (x?)(\d+)$/) do |skip, width|
  unless skip.eql? "x"
    expect(@i.image_call_width).to eq(width.to_i)
  else
  	1
  end
end

Then(/^the image call height should be (x?)(\d+)$/) do |skip, height|
  unless skip.eql? "x"
    expect(@i.image_call_height).to eq(height.to_i)
  else
  	1
  end
end

