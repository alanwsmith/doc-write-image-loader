Given(/^I use configuration (\d+)$/) do |arg1|
  @i = ImageTagBuilder.new

end

Given(/^a window\.devicePixelRatio of (\d+)$/) do |ratio|
  @i.window_device_pixel_ratio = ratio.to_i
end

Given(/^a window\.innerWidth of (\d+)$/) do |width|
  @i.window_inner_width = width.to_i
end

Given(/^a source image that's (\d+)x(\d+)$/) do |width, height|
  @i.source_width = width
  @i.source_height = height
end

Then(/^the source image width should be (\d+)$/) do |width|
  expect(@i.source_width).to eq(width)
end

Then(/^the source image height should be (\d+)$/) do |height|
  expect(@i.source_height).to eq(height)
end

Then(/^the image call width should be (\d+)$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the image call height should be (\d+)$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the width attribute should be (\d+)$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the height attribute should be (\d+)$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

