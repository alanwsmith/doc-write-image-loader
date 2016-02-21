Given(/^I have an image$/) do
  @i = Image.new
end

When(/^the source is (\d+)x(\d+)$/) do |width, height|
  @i.source_width  = width
  @i.source_height = height
end

When(/^I request an image with width (\d+)$/) do |width|
  @i.desired_width = width
end

When(/^a DPR of (\d+)$/) do |dpr|
  @i.device_pixel_ratio = dpr
end

Then(/^the source_width should be (\d+)$/) do |width|
  expect(@i.source_width).to eq(width)
end

Then(/^the source_height should be (\d+)$/) do |height|
  expect(@i.source_height).to eq(height)
end

Then(/^the call width should be (\d+)$/) do |width|
  expect(@i.call_width).to eq(width)
end

Then(/^the call height should be (\d+)$/) do |height|
  expect(@i.call_height).to eq(height)
end

Then(/^the attribute width should be (\d+)$/) do |width|
  expect(@i.attribute_width).to eq(width)
end

Then(/^the attribute height should be (\d+)$/) do |height|
  expect(@i.attribute_height).to eq(height)
end
