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
module CTOS {

    export class Control {

        public static hostInit(): void 
        {
            // Get a global reference to the canvas.  TODO: Move this stuff into a Display Device Driver, maybe?
            Globals.m_Canvas = <HTMLCanvasElement>document.getElementById('display');

            // Get a global reference to the drawing context.
            Globals.m_DrawingContext = Globals.m_Canvas.getContext('2d');

            // Get the status bar
            Globals.m_Status = <HTMLLabelElement>document.getElementById('statusLabel');
            Globals.m_Time = <HTMLLabelElement>document.getElementById('timeLabel');

            // Get the program input box
            Globals.m_ProgramInput = <HTMLTextAreaElement>document.getElementById('taProgramInput');

            // Enable the added-in canvas text functions (see canvastext.ts for provenance and details).
            CanvasTextFunctions.Enable(Globals.m_DrawingContext);   // Text functionality is now built in to the HTML5 canvas. But this is old-school, and fun.

            // Clear the log text box.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("taHostLog")).value="";

            // Set focus on the start button.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("btnStartOS")).focus();

            // Check for our testing and enrichment core.
            if (typeof Globals.m_Glados === "function") {
                Globals.m_GLaDOS = new Globals.m_Glados();
                Globals.m_GLaDOS.init();
            }
        }

        public static hostLog(msg: string, source: string = "?"): void 
        {
            // Note the OS CLOCK.
            var clock: number = Globals.m_OSClock;

            // Note the REAL clock in milliseconds since January 1, 1970.
            var now: number = new Date().getTime();

            // Build the log string.
            var str: string = "({ clock:" + clock + ", source:" + source + ", msg:" + msg + ", now:" + now  + " })"  + "\n";

            // Update the log console.
            var taLog = <HTMLInputElement> document.getElementById("taHostLog");
            taLog.value = str + taLog.value;
            // Optionally update a log database or some streaming service.
        }


        //
        // Host Events
        //
        public static hostBtnStartOS_click(btn): void
        {
            // Disable the (passed-in) start button...
            btn.disabled = true;

            // .. enable the Halt and Reset buttons ...
            document.getElementById("btnHaltOS").disabled = false;
            document.getElementById("btnReset").disabled = false;

            // .. set focus on the OS console display ...
            document.getElementById("display").focus();

            // ... Create and initialize the CPU (because it's part of the hardware)  ...
            Globals.m_CPU = new Cpu();
            Globals.m_CPU.init();

            // ... then set the host clock pulse ...
            Globals.m_HardwareClockID = setInterval(Devices.hostClockPulse, Globals.CPU_CLOCK_INTERVAL);
            // .. and call the OS Kernel Bootstrap routine.
            Globals.m_Kernel = new Kernel();
            Globals.m_Kernel.Bootstrap();

            // Achievement unlocked!
            Globals.m_AchievementSystem.Unlock(0);
        }

        public static hostBtnHaltOS_click(btn): void 
        {
            Control.hostLog("Emergency halt", "host");
            Control.hostLog("Attempting Kernel shutdown.", "host");
            // Call the OS shutdown routine.
            Globals.m_Kernel.Shutdown();
            // Stop the interval that's simulating our clock pulse.
            clearInterval(Globals.m_HardwareClockID);
            // TODO: Is there anything else we need to do here?
        }

        public static hostBtnReset_click(btn): void 
        {
            // The easiest and most thorough way to do this is to reload (not refresh) the document.
            location.reload(true);
            // That boolean parameter is the 'forceget' flag. When it is true it causes the page to always
            // be reloaded from the server. If it is false or not specified the browser may reload the
            // page from its cache, which is not what we want.
        }

        public static scrollConsoleDown() : void
        {
            // Auto-scroll down
            var elem = document.getElementById('divConsole');
            elem.scrollTop = elem.scrollHeight;
        }

        public static scrollConsoleTop() : void
        {
            // Auto-scroll up & reset height
            var elem = document.getElementById('divConsole');
            elem.scrollTop = 0;
        }

        public static AchievementAddDisplay(id : number, achievement: Achievement): void
        {
            var achievementElement = document.createElement("achievement" + id.toString());
            achievementElement.innerHTML = "</br> " + achievement.m_Description + " " + achievement.m_Score.toString();
            document.getElementById("cbp-spmenu-s1").appendChild(achievementElement);
        }

        public static AchievementIncrementScore(score: number): void
        {
            var scoreElement = document.getElementById("achievementScore");
            scoreElement.innerText = "Achievements : " + score.toString();
        }

        public static AchievementNotify(id: number): void
        {
            var notificationDiv = document.getElementById("achievementNotifDiv");
            var notificationElement = document.createElement("achievement" + id.toString() + "Alert");
            notificationElement.className = "flash";
            notificationElement.innerHTML = "</br> </br><div class=\"alert alert-info\" role=\"alert\">Achievement unlocked!</div>";
            notificationDiv.appendChild(notificationElement);
        }
    }
}
