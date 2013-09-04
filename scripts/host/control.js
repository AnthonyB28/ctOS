/* ------------  
   Control.js

   Requires global.js.
   
   Routines for the hardware simulation, NOT for our client OS itself. In this manner, it's A LITTLE BIT like a hypervisor,
   in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code that
   hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using JavaScript in 
   both the host and client environments.
   
   This (and other host/simulation scripts) is the only place that we should see "web" code, like 
   DOM manipulation and JavaScript event handling, and so on.  (Index.html is the only place for markup.)
   
   This code references page numbers in the text book: 
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */


//
// Control Services
//
function hostInit()
{
	// Get a global reference to the canvas.  TODO: Move this stuff into a Display Device Driver, maybe?
	_Canvas  = document.getElementById('display');

	// Get a global reference to the drawing context.
	_DrawingContext = _Canvas.getContext('2d');

	// Enable the added-in canvas text functions (see canvastext.js for provenance and details).
	CanvasTextFunctions.enable(_DrawingContext);   // TODO: Text functionality is now built in to the HTML5 canvas. Consider using that instead.

	// Clear the log text box.
	document.getElementById("taLog").value="";

	// Set focus on the start button.
   document.getElementById("btnStartOS").focus();

   // Check for our testing and enrichment core.
   if (typeof Glados === "function") {
      _GLaDOS = new Glados();
      _GLaDOS.init();
   };

}

function hostLog(msg, source)
{
    // Check the source.
    if (!source) {
        source = "?";
    }

    // Note the OS CLOCK.
    var clock = _OSclock;

    // Note the REAL clock in milliseconds since January 1, 1970.
    var now = new Date().getTime();

    // Build the log string.   
    var str = "({ clock:" + clock + ", source:" + source + ", msg:" + msg + ", now:" + now  + " })"  + "\n";    

    // Update the log console.
    var taLog = document.getElementById("taLog");
    taLog.value = str + taLog.value;
    // Optionally update a log database or some streaming service.
}


//
// Control Events
//
function hostBtnStartOS_click(btn)
{
    // Disable the start button...
    btn.disabled = true;
    
    // .. enable the Halt and Reset buttons ...
    document.getElementById("btnHaltOS").disabled = false;
    document.getElementById("btnReset").disabled = false;
    
    // .. set focus on the OS console display ... 
    document.getElementById("display").focus();
    
    // ... Create and initialize the CPU ...
    _CPU = new Cpu();
    _CPU.init();

    // ... then set the host clock pulse ...
    _hardwareClockID = setInterval(hostClockPulse, CPU_CLOCK_INTERVAL);
    // .. and call the OS Kernel Bootstrap routine.
    krnBootstrap();
}

function hostBtnHaltOS_click(btn)
{
    hostLog("emergency halt", "host");
    hostLog("Attempting Kernel shutdown.", "host");
    // Call the OS shutdown routine.
    krnShutdown();
    // Stop the JavaScript interval that's simulating our clock pulse.
    clearInterval(_hardwareClockID);
    // TODO: Is there anything else we need to do here?
}

function hostBtnReset_click(btn)
{
    // The easiest and most thorough way to do this is to reload (not refresh) the document.
    location.reload(true);  
    // That boolean parameter is the 'forceget' flag. When it is true it causes the page to always
    // be reloaded from the server. If it is false or not specified, the browser may reload the 
    // page from its cache, which is not what we want.
}
