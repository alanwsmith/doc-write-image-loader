var ImageLoader = function() {

}

ImageLoader.prototype.url_to_call = function() {
  return "http://res.cloudinary.com/demo/image/upload/w_512,h_341/horses.jpg"; 
};

ImageLoader.prototype.tag_height = function() {
  return 341;
};

ImageLoader.prototype.tag_width = function() {
  return 512;
};
