////////////////////////////////////////////////////////////////////////////////
// TODO 
////////////////////////////////////////////////////////////////////////////////

/*

- Test against different breakpoints. 

- Setup test to check for empty alt text and make sure it returns properly. 

- Add quality feature

- Add actual style references and calculations. 

- Make sure you slice off extra pixels when division doesn't results in an integer.

- Add tests where you override the viewport dimensions

- Put a note to make sure to use a `noscript` tag when writing the docs.

- Check against hitting the max source height and refining the parameters if that happens. 

- Check a vertical images. 

- Consider a version that adjust width completely dynamically based on widow width instead of just a breakpoints. 

*/




////////////////////////////////////////////////////////////////////////////////
// Tests
////////////////////////////////////////////////////////////////////////////////

QUnit.test("Basic test with 2x high-res image call.", function(assert) {

  //////////
  // Given

  var ip = new ImgTagBuilder({ styles: { main: { breakPoints: [ { maxImageDisplayWidth: 800, quality: 85 } ] } } });
  
  // Force environemnt for test.
  ip._multiplier = 2; // Force to '2' so testing works across devices.

  //////////
  // When
  
  ip.prep({ image: "aws-20120802--1811-01a-lightning.jpg", alt: "lightning",  style: "main", sourceWidth: 1600, ratio: 0.625});


  //////////
  // Then

  assert.equal(ip._alt, "lightning");
  assert.equal(ip._image, "aws-20120802--1811-01a-lightning.jpg");
  assert.equal(ip._sourceWidth, 1600);
  assert.equal(ip._ratio, 0.625);
  assert.equal(ip._style, "main");
  
  // TODO: Figure out how to move this out so it's called dynamically.
  assert.equal(ip._config.styles['main']['breakPoints'][0]['maxImageDisplayWidth'], 800);


  assert.equal(ip.imgTag(),'<img alt="lightning" class="main" width="800" height="500" src="http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/aws-20120802--1811-01a-lightning.jpg">'); 
  assert.equal(ip.url(),'http://res.cloudinary.com/demo/image/upload/c_fill,q_85,w_1600,h_1000/aws-20120802--1811-01a-lightning.jpg'); 
  assert.equal(ip.displayWidth(), 800);
  assert.equal(ip.displayHeight(), 500);
  assert.equal(ip.callWidth(), 1600);
  assert.equal(ip.callHeight(), 1000);
  assert.equal(ip.quality(), 85);
  assert.equal(ip._multiplier, 2);

});

////////////////////////////////////////////////////////////////////////////////

QUnit.test("Verify window.devicePixelRatio is pulled in", function(assert) {
  
  ///////////
  // Given

  var ip = new ImgTagBuilder({});

  //////////
  // Then

  assert.equal(ip._multiplier, window.devicePixelRatio);

});