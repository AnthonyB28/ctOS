///<reference path="../globals.ts" />
///<reference path="../os/canvastext.ts" />
/* ------------
Control.ts
Requires globals.ts.
Routines for the hardware simulation, NOT for our client OS itself.
These are static because we are never going to instantiate them, because they represent the hardware.
In this manner, it's A LITTLE BIT like a hypervisor, in that the Document environment inside a browser
is the "bare metal" (so to speak) for which we write code that hosts our client OS.
But that analogy only goes so far, and the lines are blurred, because we are using TypeScript/JavaScript
in both the host and client environments.
This (and other host/simulation scripts) is the only place that we should see "web" code, such as
DOM manipulation and event handling, and so on.  (Index.html is -- obviously -- the only place for markup.)
This code references page numbers in the text book:
Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
------------ */
//
// Control Services
//
var CTOS;
(function (CTOS) {
    var Control = (function () {
        function Control() {
        }
        Control.hostInit = function () {
            // Get a global reference to the canvas.  TODO: Move this stuff into a Display Device Driver, maybe?
            CTOS.Globals.m_Canvas = document.getElementById('display');

            // Get a global reference to the drawing context.
            CTOS.Globals.m_DrawingContext = CTOS.Globals.m_Canvas.getContext('2d');

            // Get the status bar
            CTOS.Globals.m_Status = document.getElementById('statusLabel');
            CTOS.Globals.m_Time = document.getElementById('timeLabel');

            // Get the program input box
            CTOS.Globals.m_ProgramInput = document.getElementById('taProgramInput');

            // Enable the added-in canvas text functions (see canvastext.ts for provenance and details).
            CTOS.CanvasTextFunctions.Enable(CTOS.Globals.m_DrawingContext); // Text functionality is now built in to the HTML5 canvas. But this is old-school, and fun.

            // Clear the log text box.
            // Use the TypeScript cast to HTMLInputElement
            document.getElementById("taHostLog").value = "";

            // Set focus on the start button.
            // Use the TypeScript cast to HTMLInputElement
            document.getElementById("btnStartOS").focus();

            // Check for our testing and enrichment core.
            if (typeof CTOS.Globals.m_Glados === "function") {
                CTOS.Globals.m_GLaDOS = new CTOS.Globals.m_Glados();
                CTOS.Globals.m_GLaDOS.init();
            }
        };

        Control.hostLog = function (msg, source) {
            if (typeof source === "undefined") { source = "?"; }
            // Note the OS CLOCK.
            var clock = CTOS.Globals.m_OSClock;

            // Note the REAL clock in milliseconds since January 1, 1970.
            var now = new Date().getTime();

            // Build the log string.
            var str = "({ clock:" + clock + ", source:" + source + ", msg:" + msg + ", now:" + now + " })" + "\n";

            // Update the log console.
            var taLog = document.getElementById("taHostLog");
            taLog.value = str + taLog.value;
            // Optionally update a log database or some streaming service.
        };

        //
        // Host Events
        //
        Control.hostBtnStartOS_click = function (btn) {
            // Disable the (passed-in) start button...
            btn.disabled = true;

            // .. enable the Halt and Reset buttons ...
            document.getElementById("btnHaltOS").disabled = false;
            document.getElementById("btnReset").disabled = false;

            // .. set focus on the OS console display ...
            document.getElementById("display").focus();

            // ... Create and initialize the CPU (because it's part of the hardware)  ...
            CTOS.Globals.m_CPU = new CTOS.Cpu();
            CTOS.Globals.m_CPU.init();

            // ... then set the host clock pulse ...
            CTOS.Globals.m_HardwareClockID = setInterval(CTOS.Devices.hostClockPulse, CTOS.Globals.CPU_CLOCK_INTERVAL);

            // .. and call the OS Kernel Bootstrap routine.
            CTOS.Globals.m_Kernel = new CTOS.Kernel();
            CTOS.Globals.m_Kernel.Bootstrap();

            // Achievement unlocked!
            CTOS.Globals.m_AchievementSystem.Unlock(0);
        };

        Control.hostBtnHaltOS_click = function (btn) {
            Control.hostLog("Emergency halt", "host");
            Control.hostLog("Attempting Kernel shutdown.", "host");

            // Call the OS shutdown routine.
            CTOS.Globals.m_Kernel.Shutdown();

            // Stop the interval that's simulating our clock pulse.
            clearInterval(CTOS.Globals.m_HardwareClockID);
            // TODO: Is there anything else we need to do here?
        };

        Control.hostBtnReset_click = function (btn) {
            // The easiest and most thorough way to do this is to reload (not refresh) the document.
            location.reload(true);
            // That boolean parameter is the 'forceget' flag. When it is true it causes the page to always
            // be reloaded from the server. If it is false or not specified the browser may reload the
            // page from its cache, which is not what we want.
        };

        Control.scrollConsoleDown = function () {
            // Auto-scroll down
            var elem = document.getElementById('divConsole');
            elem.scrollTop = elem.scrollHeight;
        };

        Control.scrollConsoleTop = function () {
            // Auto-scroll up & reset height
            var elem = document.getElementById('divConsole');
            elem.scrollTop = 0;
        };

        Control.AchievementAddDisplay = function (id, achievement) {
            var achievementElement = document.createElement("achievement" + id.toString());
            achievementElement.innerHTML = "</br> " + achievement.m_Description + " " + achievement.m_Score.toString();
            document.getElementById("cbp-spmenu-s1").appendChild(achievementElement);
        };

        Control.AchievementIncrementScore = function (score) {
            var scoreElement = document.getElementById("achievementScore");
            scoreElement.innerText = "Achievements : " + score.toString();
        };

        Control.AchievementNotify = function (id) {
            var notificationDiv = document.getElementById("achievementNotifDiv");
            var notificationElement = document.createElement("achievement" + id.toString() + "Alert");
            notificationElement.className = "flash";
            notificationElement.innerHTML = "</br> </br><div class=\"alert alert-info\" role=\"alert\">Achievement unlocked!</div>";
            notificationDiv.appendChild(notificationElement);
        };
        return Control;
    })();
    CTOS.Control = Control;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=control.js.map
