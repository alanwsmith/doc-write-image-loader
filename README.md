document.write Image Loader
===========================

A plain-old JavaScript, resolution aware, responsive image loader. 

Example site: [http://alanwsmith.github.io/doc-write-image-loader/](http://alanwsmith.github.io/doc-write-image-loader/)

Overview
--------

Every approach I've seen for loading responsive images feels rough. This is an attempt to use an old-school approach to make a better solution. It uses `document.write` to output the `<img>` tags. `document.write` blocks rendering. While that causes performance degradations in most cases, my hypothesis is that it doesn't here. I prefer the browser to have `width` and `height` image attributes to work with so it knows what area to set aside while the image loads. Additionally, calculating the exact size to fit the space avoids downloading unnecessarily large files only to reduce their size during display.

That's the hypothesis. Experimentation to validate it is underway.


A Work in Progress
------------------

This is script is not yet ready for prime time. There are several hard coded development stubs. You'll need to work around them if you want to use this script as a starting point. 

Serving Images
--------------

The script assembles `<img>` tags dynamically based on `window.devicePixelRatio`, `window.innerWidth`, and a local configuration. It does not generate images themselves. That's the responsibility of the server providing the images. I'm using Cloudinary to serve images. Some aspects of the script are currently based off that assumption. 


Dynamic Calling Only
--------------------

This script doesn't attempt to change the images if the browser window is resized. That's an exercise left to the reader. (Of course, if the page is reloaded after the window size is changed, a new image call for the appropriate size will be used.)


Usage
-----

There are two ways to use the script:

1. Make a synchronous, external .js call in the `<head>` of an HTML document.
2. Paste it directly between `<script>` tags in the `<head>` of an HTML document. 

The first way will save a little bandwidth via caching. 

The second way avoids the HTTP call. It's the approach took with the original design. 


TODO
----

- Provide dynamic image sizes based on a percentage of `window.innerWidth`.
- Create minified version of the script.
