Given(/^I have an image$/) do
  @i = Image.new
end

When(/^the source is (\d+)x(\d+)$/) do |width, height|
  @i.source_width  = width
  @i.source_height = height
end

Then(/^the source_width should be (\d+)$/) do |width|
  expect(@i.source_width).to eq(width)
end

Then(/^the source_height should be (\d+)$/) do |height|
  expect(@i.source_height).to eq(height)
end
