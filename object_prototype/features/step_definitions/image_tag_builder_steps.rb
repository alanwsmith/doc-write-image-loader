Given(/^I have an ImageTagBuilder$/) do
  @i = ImageTagBuilder.new 
end

Given(/^a source image that's (\d+)x(\d+)$/) do |width, height|
  @i.source_width = width.to_i
  @i.source_height = height.to_i
end

Given(/^a viewport that's (\d+)x(\d+)$/) do |width, height|
  @i.window_inner_width = width.to_i
  @i.window_inner_height= height.to_i
end

Given(/^a window\.devicePixelRatio of (\d+)$/) do |ratio|
  @i.window_device_pixel_ratio = ratio.to_i
end

Given(/^a type of (.*?)$/) do |type|
  @i.image_type = type
end

Given(/^a window\.innerWidth of (\d+)$/) do |width|
  @i.window_inner_width = width.to_i
end

When(/^I request a "([^"]*)" image$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the max visual width should be (\d+)$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the source image width should be (\d+)$/) do |width|
  expect(@i.source_width).to eq(width.to_i)
end

Then(/^the source image height should be (\d+)$/) do |height|
  expect(@i.source_height).to eq(height.to_i)
end

Then(/^the image call width should be (\d+)$/) do |width|
  if width.to_i == 0
  	pending
  else 
    expect(@i.image_call_width).to eq(width.to_i)
  end
end

Then(/^the image call height should be (\d+)$/) do |height|
  expect(@i.image_call_height).to eq(height.to_i)
end

Then(/^the width attribute should be (\d+)$/) do |width|
  expect(@i.attribute_width).to eq(width.to_i)
end

Then(/^the height attribute should be (\d+)$/) do |height|
  expect(@i.attribute_height).to eq(height.to_i)
end

