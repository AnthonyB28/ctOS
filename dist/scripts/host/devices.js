///<reference path="../globals.ts" />
/* ------------
Devices.ts
Requires global.ts.
Routines for the hardware simulation, NOT for our client OS itself.
These are static because we are never going to instantiate them, because they represent the hardware.
In this manner, it's A LITTLE BIT like a hypervisor, in that the Document environment inside a browser
is the "bare metal" (so to speak) for which we write code that hosts our client OS.
But that analogy only goes so far, and the lines are blurred, because we are using TypeScript/JavaScript
in both the host and client environments.
This (and simulation scripts) is the only place that we should see "web" code, like
DOM manipulation and TypeScript/JavaScript event handling, and so on.  (Index.html is the only place for markup.)
This code references page numbers in the text book:
Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
------------ */
var CTOS;
(function (CTOS) {
    var Devices = (function () {
        function Devices() {
            CTOS.Globals.m_HardwareClockID = -1;
        }
        //
        // Hardware/Host Clock Pulse
        //
        Devices.hostClockPulse = function () {
            // Increment the hardware (host) clock.
            CTOS.Globals.m_OSClock++;

            // Update the time GUI
            // Only update every few pulses, otherwise speed is compromised here....
            if (CTOS.Globals.m_OSClock % 10 == 0) {
                var currentDate = new Date();
                CTOS.Globals.m_Time.textContent = "Time : " + currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
            }

            // Call the kernel clock pulse event handler.
            CTOS.Globals.m_Kernel.OnCPUClockPulse();
        };

        //
        // Keyboard Interrupt, a HARDWARE Interrupt Request. (See pages 560-561 in text book.)
        //
        Devices.HostEnableKeyboardInterrupt = function () {
            // Listen for key press (keydown, actually) events in the Document
            // and call the simulation processor, which will in turn call the
            // OS interrupt handler.
            document.addEventListener("keydown", Devices.hostOnKeypress, false);
        };

        Devices.hostDisableKeyboardInterrupt = function () {
            document.removeEventListener("keydown", Devices.hostOnKeypress, false);
        };

        Devices.hostOnKeypress = function (event) {
            // The canvas element CAN receive focus if you give it a tab index, which we have.
            // Check that we are processing keystrokes only from the canvas's id (as set in index.html).
            if (event.target.id === "display") {
                event.preventDefault();

                // Note the pressed key code in the params (Mozilla-specific).
                var params = new Array(event.which, event.shiftKey);

                // Enqueue this interrupt on the kernel interrupt queue so that it gets to the Interrupt handler.
                CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_REQUEST_KEYBOARD, params));
            }
        };
        return Devices;
    })();
    CTOS.Devices = Devices;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=devices.js.map
