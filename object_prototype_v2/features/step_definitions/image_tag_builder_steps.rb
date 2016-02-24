Given(/^I have an Image Tag Builder with standard config$/) do
  @itb = ImageTagBuilder.new
end

Given(/^a source image that's (\d+)x(\d+)$/) do |width, height|
  @itb.source_width = width.to_i
  @itb.source_height = height.to_i
end

Given(/^a viewport that's (\d+)x(\d+)$/) do |width, height|
  @itb.viewport_width = width.to_i
  @itb.viewport_height = height.to_i
end

Given(/^a DPR of (\d+)$/) do |dpr|
  @itb.dpr = dpr.to_i
end

When(/^I set the width to (\d+)px$/) do |pixels|
  @itb.requested_width_in_pixels = pixels.to_i
end

Then(/^the attribute width should be (\d+)$/) do |width|
  expect(@itb.attribute_width).to eq(width.to_i)
end

Then(/^the attribute height should be (\d+)$/) do |height|
  expect(@itb.attribute_height).to eq (height.to_i)
end

Then(/^the call width should be (\d+)$/) do |width|
  expect(@itb.call_width).to eq (width.to_i)
end

Then(/^the call height should be (\d+)$/) do |height|
  expect(@itb.call_height).to eq (height.to_i)
end

