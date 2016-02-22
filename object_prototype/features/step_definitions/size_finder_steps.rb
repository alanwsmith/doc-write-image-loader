Given(/^I have a SizeFinder$/) do
  @sf = SizeFinder.new
end

Given(/^I load the base test styles$/) do
  @sf.load_basic_tests
end

When(/^the window size is (\d+)x(\d+)$/) do |width, height|
  @sf.window_inner_width = width
  @sf.window_inner_height = height
end

Then(/^the request width returned by '(.*?)' should be (\d+)px\.$/) do |style, pixels|
  expect(@sf.request_width style).to eq(pixels.to_i)
end
