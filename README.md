# ctOS - Central Operating System

ctOS is a TypeScript Operating System made for Marist OS 2014 class, based on a fork of the [baseline source code][1] by Bob Nisco and Alan Labouseur.

ctOS is reference to [Watch_Dogs], a 2014 game made by Ubisoft. I had interned at Ubisoft for some time before the class, and after returning, I felt it fit the theme of an OS project well! It gave me a good excuse to fill it in with plenty of inside game industry jokes and various quotes from games.

## Project Goals
ctOS is a simulation of a basic Operating System in the web browser. It follows the [operation codes] and design of a specified 6502 provided by Alan Labouseur.

[iProject 1]
* Lab 0 Activity: Development tooling: TypeScript to JavaScript
* Lab 1 Activity: Adding shell commands
* Lab 2 Activity: Manipulating the Canvas

[iProject 2]
* Lab 3 Activity: Implementing CPU op codes
* Lab 4 Activity: Executing one program

[iProject 3]
* Lab 5 Activity: Implementing a scheduler and context switches
* Lab 6 Activity: Memory protection with base and limit tracking
* Lab 7 Activity: Executing many programs in memory

[Final Project] (P4)
* Lab 8 Activity: Simulating disk hardware
* Lab 9 Activity: Implementing a disk subsystem
* Lab A Activity: Executing many programs in memory and from disk

The overall course goals were:	
* develop	demonstrable	expertise	and	philosophical	appreciation	for	the	design	and	
implementation	of	modern,	event-driven,	super	cool	Operating	Systems.
* survive	the	ordeal	of	actually	writing	one.	
* continually	have	reinforced	the	core	concepts	of	encapsulated-oriented	
programming	while	being	introduced	to	more	advanced	concepts	like	concurrencyoriented
programming.
* embrace	the	opportunity	to	develop	a	complex	system	over	the	course	of	the	
semester	where	you	have	to	live	with	you	prior	mistakes	and	shortcuts	or	go	back	
and	fix	them.		Either	will	teach	a	valuable	lesson.
* learn	that	developing	the	software	is	only	half	the	battle,	debugging	and	testing	are	
critical	skills	for	a	talented	professional,	and	skills	that	will	be	stressed.	
* enhance	your	continuing	education	skills.	Capable	problem	solvers	never	stop	
learning.	You	will	get	practice	in	finding	answers	for	yourself.	Plus,	preparation	and	
presentation	of	the	final	project,	as	well	as	participation	in	class	discussions,	and	
assignments	requires	at	least	a	little	research,	so	there’s	that	to	look	forward	to.

## Features
- Code design follows basic OS architecture, complete with Interrupt Queues, Drivers, CPU, RAM, and more
- HTML5 canvas used to simulate interactive shell
- Based on the small selection of [operation codes], ctOS can run basic 6502 based programs.
- CPU Scheduler can run these programs based on Round Robin, Priority, or First-Come-First-Serve scheduling.
- Memory Manager functions as physical address translator
- Functional hard drive using Track-Sector-Block design where each TSB hold 60 bytes of data
using HTML5 storage
- Gamified Achievement System, can you unlock them all?
- Plenty of command line secrets and fun

## Commands
As of 12/7/2014:
* ver - Displays the current version data.
* load - Loads the program from Program Input box.
* clearmem - Resets all memory blocks.
* run <PID> - Runs the program by ID that is in memory.
* runall - Runs all the programs in memory.
* quantum <number> - Sets the round robin quantum measured in clock ticks.
* ps - Displays all the active processes.
* kill <pid> - Kills the specified PID
* create <filename> - Creates a file.
* read <filename> - Reads and displays file content.
* write <filename> \"data\" - Write data in quotes to filename.
* delete <filename> - Remove filename from storage.
* format - All of the disk is initialized.
* ls - List all files currently stored on the disk.
* setschedule <type> - Set scheduler method rr, fcfs, or priority.
* getschedule - Returns type of scheduler method.
* help - This is the help command. Seek help.
* shutdown - Shuts down the virtual OS but leaves the underlying hardware simulation running.
* cls - Clears the screen and resets the cursor position.
* man <topic> - Displays the Manual page for <topic>.
* trace <on | off> - Turns the OS trace on or off.
* rot13 <string> - Does rot13 obfuscation on <string>.
* prompt <string> - Sets the prompt.
* date - Displays the current Date & Time.
* whereami - Displays the users current location. (Lie)
* status <string> - Sets the status message
* explode! - BSOD & Shutdown
* alan! - 00...7?
* assassin! - Are there assassins hiding?
* templar! - Are there any Templar schemes afoot?
* ezio! - Clearly the best Assassin.
* insanity? - What is it?
* watch_dogs - DeadSec is here?"

### Tech

**What's TypeScript?**
TypeScript is a language that allows you to write in a statically-typed language that outputs standard JS!

**Why should I use it?**
This will be especially helpful for an OS or a Compiler that may need to run in the browser as you will have all of the great benefits of type checking built right into your language.

**Where can I get more info on TypeScript**
[Right this way!](http://www.typescriptlang.org/)

* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [Modernizr] - evented I/O for the backend
* [DefinitelyTyped] - great typing for TypeScript
* [jQuery] - duh

=====================================

Original readme:
TSOS-2014
============

This is my Fall 2014 Operating Systems class initial project.
See http://www.labouseur.com/courses/os/ for details.

Setup TypeScript/Gulp
=====================

1. Install [npm](https://www.npmjs.org/), if you don't already have it
1. `npm install -g typescript` to get the TypeScript Compiler
1. `npm install gulp` to get the Gulp Task Runner
1. `npm install gulp-tsc` to get the Gulp TypeScript plugin

Your Workflow
=============

Just run `gulp` at the command line in the root directory of this project! Edit your TypeScript files in the source/scripts directory in your favorite editor. Visual Studio has some additional tools that make debugging, syntax highlighting, and more very easy. WebStorm looks like a nice option as well.

Gulp will automatically:

* Watch for changes in your source/scripts/ directory for changes to .ts files and run the TypeScript Compiler on it
* Watch for changes to your source/styles/ directory for changes to .css files and copy them to the dist/ folder


Gulp FAQs
=========

**Personally I prefer to just use Visual Studio for TypeScript development. Native debugging is way easier and build commands does everything Gulp does right within the project. No need to worry about multiple executables and installs.**

**Why are we using Gulp?**
Gulp is a tool that allows you to automate tons of workflow tasks. In this instance, we want it to watch our directory for changes and automatically run the TypeScript compiler on the source files to output JS to a distribution folder. We also use it to copy over .css files to our distribution folder.

**Copying over CSS files to a dist folder? That seems useless**
Well, in this case, it pretty much is, but it keeps your development consistent. You keep your source in the source directory, and you keep what you want to output to the user in the dist directory. In more mature front-end environments, you may be utilizing a CSS-preprocessor like LESS or SASS. This setup would allow you to keep your .less or .scss files in the source/styles directory, then output the compiled css folders to the dist/styles directory.

**What other cool things can I do with Gulp?**
If you were in a production environment where you wanted to obfuscate your code, you can use Gulp to automatically run things like [Uglify](https://github.com/terinjokes/gulp-uglify) on your JS/CSS. Or if you wanted to [minify your CSS](https://www.npmjs.org/package/gulp-minify-css). It is NOT recommended to do this for this project as you and Alan will need to read and debug this code, and allow GLaDOS to run code against yours.

**Where can I get more info on Gulp?**
[Right this way!](http://gulpjs.com/)


[1]:https://github.com/labouseur/TSOS-2014
[Watch_Dogs]:http://watchdogs.wikia.com/wiki/CtOS
[operation codes]: https://www.dropbox.com/s/4w69vbrt5sdyl50/6502alan-instruction-set.pdf?dl=0
[iProject 1]:https://www.dropbox.com/s/lxth8tdpiwgjm3k/iProject1.pdf?dl=0
[iProject 2]:https://www.dropbox.com/s/ay3zwkc66turf0y/iProject2.pdf?dl=0
[iProject 3]:https://www.dropbox.com/s/vzb81atuv65sugp/iProject3.pdf?dl=0
[Final Project]:https://www.dropbox.com/s/yzclyy9if18l7x0/iProject4-final.pdf?dl=0
[DefinitelyTyped]:http://definitelytyped.org/
[Modernizr]:http://modernizr.com/
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[jQuery]:http://jquery.com
