Given(/^I use configuration (\d+)$/) do |arg1|
  @i = ImageTagBuilder.new

end

Given(/^a window\.devicePixelRatio of (\d+)$/) do |ratio|
  @i.window_device_pixel_ratio = ratio.to_i
end

Given(/^a window\.innerWidth of (\d+)$/) do |width|
  @i.window_inner_width = width.to_i
end

Given(/^a source image that's (\d+)x(\d+)$/) do |arg1, arg2|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the source image width should be (\d+)$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the source image height should be (\d+)$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
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

