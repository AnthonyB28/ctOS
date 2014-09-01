TSOS-2014
============

This is my Fall 2014 Operating Systems class initial project.
See http://www.labouseur.com/courses/os/ for details.

Setup TypeScript/Gulp
=====================

1. Install [npm](https://www.npmjs.org/), if you don't already have it
1. `npm install tsc` to get the TypeScript Compiler
1. `npm install gulp` to get the Gulp Task Runner
1. `npm install gulp-tsc` to get the Gulp TypeScript plugin

Your Workflow
=============

Just run `gulp` at the command line in the root directory of this project! Edit your TypeScript files in the source/scripts directory in your favorite editor. Visual Studio has some additional tools that make debugging, syntax highlighting, and more very easy. WebStorm looks like a nice option as well.

Gulp will automatically:

* Watch for changes in your source/scripts/ directory for changes to .ts files and run the TypeScript Compiler on it
* Watch for changes to your source/styles/ directory for changes to .css files and copy them to the dist/ folder

TypeScript FAQs
==================

**What's TypeScript?**
TypeScript is a language that allows you to write in a statically-typed language that outputs standard JS!

**Why should I use it?**
This will be especially helpful for an OS or a Compiler that may need to run in the browser as you will have all of the great benefits of type checking built right into your language.

**Where can I get more info on TypeScript**
[Right this way!](http://www.typescriptlang.org/)

Gulp FAQs
=========

**Why are we using Gulp?**
Gulp is a tool that allows you to automate tons of workflow tasks. In this instance, we want it to watch our directory for changes and automatically run the TypeScript compiler on the source files to output JS to a distribution folder. We also use it to copy over .css files to our distribution folder.

**Copying over CSS files to a dist folder? That seems useless**
Well, in this case, it pretty much is, but it keeps your development consistent. You keep your source in the source directory, and you keep what you want to output to the user in the dist directory. In more mature front-end environments, you may be utilizing a CSS-preprocessor like LESS or SASS. This setup would allow you to keep your .less or .scss files in the source/styles directory, then output the compiled css folders to the dist/styles directory.

**What other cool things can I do with Gulp?**
If you were in a production environment where you wanted to obfuscate your code, you can use Gulp to automatically run things like [Uglify](https://github.com/terinjokes/gulp-uglify) on your JS/CSS. Or if you wanted to [minify your CSS](https://www.npmjs.org/package/gulp-minify-css). It is NOT recommended to do this for this project as you and Alan will need to read and debug this code, and allow GLaDOS to run code against yours.

**Where can I get more info on Gulp?**
[Right this way!](http://gulpjs.com/)
