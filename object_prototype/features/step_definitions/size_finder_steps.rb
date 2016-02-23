Given(/^I have a SizeFinder$/) do
  @sf = SizeFinder.new
end

Given(/^A SizeFinder with a (\d+)x(\d+) viewport and a (\d+) DPR$/) do |width, height, dpr|
  @sf = SizeFinder.new_with(window_inner_width: width.to_i, window_inner_height: height.to_i, window_device_pixel_ratio: dpr)
end

When(/^the window size is (\d+)x(\d+)$/) do |width, height|
  @sf.window_inner_width = width
  @sf.window_inner_height = height
end

Then(/^the window_inner_height should be (\d+)$/) do |height|
  expect(@sf.window_inner_height).to eq(height.to_i)
end

Then(/^the window_inner_width should be (\d+)$/) do |width|
  expect(@sf.window_inner_width).to eq(width.to_i)
end

Then(/^the request width returned by '(.*?)' should be (\d+)px\.$/) do |style, pixels|
  expect(@sf.request_width_for_style style).to eq(pixels.to_i)
end
