document.write Image Loader
===========================

A plain-old JavaScript, resolution aware, responsive image loader. 

Live example: [http://alanwsmith.github.io/doc-write-image-loader/](http://alanwsmith.github.io/doc-write-image-loader/)

Overview
--------

Every approach I've seen for loading responsive images feels rough. This is an attempt to use an old-school approach to make a better solution. It uses `document.write` to output the `<img>` tags. `document.write` blocks rendering. While that causes performance degradations in most cases, my hypothesis is that it doesn't here. I prefer the browser to have `width` and `height` image attributes to work with so it knows what area to set aside while the image loads. Additionally, calculating the exact size to fit the space avoids downloading unnecessarily large files only to reduce their size during display.

That's the hypothesis. We'll see if it holds up.


A Work in Progress
------------------

This project isn't ready for prime time. For example, 

- There are several hard coded development stubs. 
- There are missing features. 
- It's not optimized. 
- etc...

That said, the conceptual framework is in place. There's enough to use as a starting point if you'd like to experiment as well. 

Concepts
--------

- The area the image will occupy is defined explicitly. There's no need to redraw the page or resize the image. It's effectively the same as if a server side process had provided a custom page based on the browsers parameters. Instead of relying on the server to do that work, it's pushed back to the client via the document.write call. Because it blocks, it effectively happens at the initial load. The hypothesis is that JavaScript in modern browsers is fast enough to make this a minimal performance hit and hopefully less than other options. 
- The object pulls the viewport and devicePixelRatio into local variables. This is done so that QUnit can override them for testing differnet sizes and ratios on a single device/page.



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

This approach sacrafices the ability to display images if JavaScript is turned off. While that only impacts a small number of poeple, a fallback should be provided to maintain as universal a page as possible. The recommended approach is to add a `<noscript>` with a static version of the `<img>` tag behind each embedded `<script>` call.  


Roadmap TODOs
-------------

- (all the TODOs in the code comments)
- Setup the config options so it doesn't matter what order the image sizes are defined.
- Make sure all dimensions are converted to integers. 
- Slice off extra pixels when division doesn't results in an integer.
- Test hitting the max source height and refining the parameters if that happens. 
- Test vertical images. 
- Determine browser support and decide on extent of fallbacks.
- Test page with lots of images calls.
- Test to check for empty alt text and make sure it returns properly. 
- Test to check default quality value. 
- Test 1 and 1.3 devicePixelRatios. 




Possible Future Features
------------------------

- Flag that allows images to be enlarged if they get called at a size large than the max avaialble.
- Dynamic image sizes based on a percentage of `window.innerWidth`.
- Ability to limit image size so it fits in the `winner.innerHeight` as well. 
- Minified version of the script.
- Comparison test pages with other ways to call images to test against.



