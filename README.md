document.write Image Loader
===========================

Work In Progress
----------------

The project isn't ready for prime time. It's still a work in progress. 

It's stability varies and should not be used in production at this point.



Overview
--------

A plain-old JavaScript, resolution aware, responsive image loader. 

Live example: [http://alanwsmith.github.io/document.write-image-loader/](http://alanwsmith.github.io/document.write-image-loader/)


Every approach I've seen for loading responsive images feels rough. This is an attempt to use an old-school approach to make a better solution. It uses `document.write` to output the `<img>` tags. `document.write` blocks rendering. While that causes performance degradations in most cases, my hypothesis is that it won't here. I prefer the browser to have `width` and `height` image attributes to work with so it knows what area to set aside while the image loads. Additionally, calculating the exact size to fit the space avoids downloading unnecessarily large files only to reduce their size during display.

That's the hypothesis. We'll see if it holds up.


Usage
-----

**Setup**

Place a call to the script in the `<head>` of the HTML and call initial setup functions:

    <script src="document-write-image-loader-0-5-x/document-write-image-loader.js"></script>
    var image_loader = new ImageLoader_0_5_x;
    image_loader.set_url_template('http://res.cloudinary.com/demo/image/upload/w_[WIDTH],h_[HEIGHT]/[FILENAME]');


NOTE: It's also possible to copy and paste the code directly into the `<head>` of the document. 




--- 

_Old Notes_

**Setup**

Either place a call to the script in the `<head>` of the HTML with:

    <script src="document-write-image-loader-0-5-x/document-write-image-loader.js"></script>
    var imageLoader = new ImageLoader_0_5_x;
    imageLoader.load_environmental_param();

Or, copy the contents of the `.js` file into the `<head>` of HTML directly. 

**Calling**

NOTE: This is the desired structure for the minimum number of parameters that can be used for the call. Making it happen is still a work in progress.

    imageLoader.load_image( { 
        filename: "horses.jpg", 
        alt_text: "Photo of Horses",
        source_width: 1600,
        source_height: 1067
    });

The idea here is that the image will max out to the viewport width. 

TODO: Update so the image goes to 100% of the width of whatever container it's in. 



Repo Checkout Procedure
-----------------------

- Since this project is using GitHub Pages, `gh-pages` is used in place of the `master` branch. 
- First step is to checkout a branch from `gh-pages` with the target version number (e.g. `0.4.0-dev`).
- No work sould be done on the branches with the semantic version numbers. 
- Instead, checkout a dev/working branch from the semantic versoin number version and work on it. 
- Rinse/repeat combining back into the semver branch until it's ready. 
- When it's ready, merge it back into `gh-pages` and add a tag with the version number.




Versioning
----------

- The primary `.js` file name is always the same, but each version is stored in its own numbered directory to ease testing/qa/deployment. This also makes it possible to transition from one version to the next in stages instead of a Big Bang change.
- The primary class's name contains a semantic version number. 
- The major and minor veresions are always defined. 
- The patch version is always `x`. 
- The expectation is that any actual patch number for any specific major+minor version will pass the same tests.


Concepts
--------

- The area the image will occupy is defined explicitly. There's no need to redraw the page or resize the image. It's effectively the same as if a server side process had provided a custom page based on the browsers parameters. Instead of relying on the server to do that work, it's pushed back to the client via the document.write call. Because it blocks, it effectively happens at the initial load. The hypothesis is that JavaScript in modern browsers is fast enough to make this a minimal performance hit and hopefully less than other options. 
- The prototype used specific pixels sizes and breakpoints. This refined version simply uses percentages of screen size. While, that won't work for every application (e.g. designs with very specific alignments), it covers the basic image viewing use case. 


Serving Images
--------------

The script assembles `<img>` tags dynamically based on `window.devicePixelRatio`, `window.innerWidth`, and a local configuration. It does not generate images themselves. That's the responsibility of the server providing the images. I'm using [Cloudinary](http://cloudinary.com/) for the examples. Some aspects of the script are currently based off that assumption. Your millage may vary if you use a different solution.


Dynamic Calling Only
--------------------

This script doesn't change images if the browser window is resized. That's an exercise left to the reader. (Of course, if the page is reloaded after the window size is changed, a new image call for the appropriate size will be used.)


Usage
-----

There are two ways to use the script:

1. Make a synchronous, external .js call in the `<head>` of an HTML document.
2. Paste it directly between `<script>` tags in the `<head>` of an HTML document. 

The first way will save a little bandwidth via caching. 

The second way avoids the HTTP call. It's the original approach I had in mind.


`<noscript>` Fallback 
---------------------

This approach sacrafices the ability to display images if JavaScript is turned off. While that only impacts a small number of poeple, a fallback should be provided to maintain as universal a page as possible. The recommended approach is to add a `<noscript>` with a static version of the `<img>` tag behind each embedded `<script>` call. Bonus points for using `srcset`, `picture`, or other responsive fallbacks. 


Less Blinking
-------------

Early resuts show there images don't flash/blink in some browsers with this approach they way they do with other JavaScript loaders.

Max Render Width
----------------

An optional max_render_width can be set. Useful for making sure images don't show up wider than the column they are designed to fit in. 

If no max width is set, then the raw image sized is used. This prevents images from being enlarged and losing quality. While that means the raw image size can be used as a limiter, it's unadvisable. As higher resolution devices come up raw size demands go up. If old images are updated with higher resolution versions to accomodate, problems can occur.  


Notes
-----

- `percent_of_viewport_height` is optional. If it's called, it does a calculate to make a new `_percent_of_viewport_width` value. All the actual math is based off that. 




Roadmap TODOs
-------------

- Set a default quality 
- (all the TODOs in the code comments)
- Make sure all dimensions are converted to integers. 
- Slice off extra pixels when division doesn't results in an integer.
- Test hitting the max source height and refining the parameters if that happens. 
- Test vertical images. 
- Determine browser support and decide on extent of fallbacks.
- Test page with lots of images calls.
- Test to check for empty alt text and make sure it returns properly. 
- Test to check default quality value. 
- Test 1 and 1.3 devicePixelRatios. 
- Optional flag that make sure image stays completely viewable inside the viewport (e.g. reduce if it would be too tall)
- Setup a process to update version number strings in documentation automatcially.
- Define required parameters and make sure they are called. 
- Add ability to apply `class` (and maybe `id`) attributes
- Add ability to pass `alt` and `title` attributes.
- Maybe output console messages if the minimum required params aren't provided
- Set default % of viewport width to 100%
- Make sure width is always returned as an integer. 
- Make sure height is always returned as an integer. 
- Make sure any half pixel results are truncated properly. 
- Add ability to restrict image so it's always fully visible (e.g. reduce if it would otherwise be too tall). 
- Maybe set default dpr to 1 if no value is avaialble.  
- Make sure to check odd width and height at different dprs. 
- Test 1.3 dpr. 
- Setup so return widths are always divisible by 10 to reduce number of possible iterations. 
- Add feature to make sure if a max_render_width is used that's bigger than the raw image, the raw image takes precedence.
- Could add a flag to allow for upsizing of smaller images. 
- See if there's a way to automatically pull the width value of the parent container to use that for the base width.
- Add fallback for not getting innerWidth and innerHeight.
- Maybe throw an error if extra params are sent. 
- Figure out how to handle image loading if both width and height are restricted. 
- Make sure that if `percent_of_viewport_height`, the width stays smaller than the window width. 



Possible Future Features
------------------------

- Move example site to its own domain.
- Flag that allows images to be enlarged if they get called at a size large than the max avaialble.
- Dynamic image sizes based on a percentage of `window.innerWidth`.
- Ability to limit image size so it fits in the `winner.innerHeight` as well. 
- Minified version of the script.
- Comparison test pages with other ways to call images to test against.
- Breakpoint config generator tool. (maybe not if only percentages are used)



