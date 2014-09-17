/* ------------
Kernel.ts
Requires globals.ts
Routines for the Operating System, NOT the host.
This code references page numbers in the text book:
Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
------------ */
var CTOS;
(function (CTOS) {
    var Kernel = (function () {
        function Kernel() {
        }
        //
        // OS Startup and Shutdown Routines
        //
        Kernel.prototype.krnBootstrap = function () {
            CTOS.Control.hostLog("bootstrap", "host"); // Use hostLog because we ALWAYS want this, even if _Trace is off.

            // Initialize our global queues.
            CTOS.Globals.m_KernelInterruptQueue = new CTOS.Queue(); // A (currently) non-priority queue for interrupt requests (IRQs).
            CTOS.Globals.m_KernelBuffers = new Array(); // Buffers... for the kernel.
            CTOS.Globals.m_KernelInputQueue = new CTOS.Queue(); // Where device input lands before being processed out somewhere.
            CTOS.Globals.m_Console = new CTOS.Console(); // The command line interface / console I/O device.

            // Initialize the console.
            CTOS.Globals.m_Console.init();

            // Initialize standard input and output to the _Console.
            CTOS.Globals.m_StdIn = CTOS.Globals.m_Console;
            CTOS.Globals.m_StdOut = CTOS.Globals.m_Console;

            // Load the Keyboard Device Driver
            this.krnTrace("Loading the keyboard device driver.");
            CTOS.Globals.m_KrnKeyboardDriver = new CTOS.DeviceDriverKeyboard(); // Construct it.
            CTOS.Globals.m_KrnKeyboardDriver.driverEntry(); // Call the driverEntry() initialization routine.
            this.krnTrace(CTOS.Globals.m_KrnKeyboardDriver.status);

            //
            // ... more?
            //
            // Enable the OS Interrupts.  (Not the CPU clock interrupt, as that is done in the hardware sim.)
            this.krnTrace("Enabling the interrupts.");
            this.krnEnableInterrupts();

            // Launch the shell.
            this.krnTrace("Creating and Launching the shell.");
            CTOS.Globals.m_OsShell = new CTOS.Shell();
            CTOS.Globals.m_OsShell.init();

            // Finally, initiate testing.
            if (CTOS.Globals.m_GLaDOS) {
                CTOS.Globals.m_GLaDOS.afterStartup();
            }
        };

        Kernel.prototype.krnShutdown = function () {
            this.krnTrace("begin shutdown OS");

            // TODO: Check for running processes.  Alert if there are some, alert and stop.  Else...
            // ... Disable the Interrupts.
            this.krnTrace("Disabling the interrupts.");
            this.krnDisableInterrupts();

            //
            // Unload the Device Drivers?
            // More?
            //
            this.krnTrace("end shutdown OS");
        };

        Kernel.prototype.krnOnCPUClockPulse = function () {
            /* This gets called from the host hardware sim every time there is a hardware clock pulse.
            This is NOT the same as a TIMER, which causes an interrupt and is handled like other interrupts.
            This, on the other hand, is the clock pulse from the hardware (or host) that tells the kernel
            that it has to look for interrupts and process them if it finds any.                           */
            //Did I ever tell you what the definition of insanity is? Insanity is doing the exact... same fucking thing...over and over again expecting shit to change... That.Is.Crazy.
            // Check for an interrupt, are any. Page 560
            if (CTOS.Globals.m_KernelInterruptQueue.getSize() > 0) {
                // Process the first interrupt on the interrupt queue.
                // TODO: Implement a priority queue based on the IRQ number/id to enforce interrupt priority.
                var interrupt = CTOS.Globals.m_KernelInterruptQueue.dequeue();
                this.krnInterruptHandler(interrupt.irq, interrupt.params);
            } else if (CTOS.Globals.m_CPU.isExecuting) {
                CTOS.Globals.m_CPU.cycle();
            } else {
                this.krnTrace("Idle");
            }
        };

        //
        // Interrupt Handling
        //
        Kernel.prototype.krnEnableInterrupts = function () {
            // Keyboard
            CTOS.Devices.hostEnableKeyboardInterrupt();
            // Put more here.
        };

        Kernel.prototype.krnDisableInterrupts = function () {
            // Keyboard
            CTOS.Devices.hostDisableKeyboardInterrupt();
            // Put more here.
        };

        Kernel.prototype.krnInterruptHandler = function (irq, params) {
            // This is the Interrupt Handler Routine.  Pages 8 and 560. {
            // Trace our entrance here so we can compute Interrupt Latency by analyzing the log file later on.  Page 766.
            this.krnTrace("Handling IRQ~" + irq);

            switch (irq) {
                case CTOS.Globals.TIMER_IRQ:
                    this.krnTimerISR(); // Kernel built-in routine for timers (not the clock).
                    break;
                case CTOS.Globals.KEYBOARD_IRQ:
                    CTOS.Globals.m_KrnKeyboardDriver.isr(params); // Kernel mode device driver
                    CTOS.Globals.m_StdIn.handleInput();
                    break;
                default:
                    this.krnTrapError("Invalid Interrupt Request. irq=" + irq + " params=[" + params + "]");
            }
        };

        Kernel.prototype.krnTimerISR = function () {
            // The built-in TIMER (not clock) Interrupt Service Routine (as opposed to an ISR coming from a device driver). {
            // Check multiprogramming parameters and enforce quanta here. Call the scheduler / context switch here if necessary.
        };

        //
        // System Calls... that generate software interrupts via tha Application Programming Interface library routines.
        //
        // Some ideas:
        // - ReadConsole
        // - WriteConsole
        // - CreateProcess
        // - ExitProcess
        // - WaitForProcessToExit
        // - CreateFile
        // - OpenFile
        // - ReadFile
        // - WriteFile
        // - CloseFile
        //
        // OS Utility Routines
        //
        Kernel.prototype.krnTrace = function (msg) {
            // Check globals to see if trace is set ON.  If so, then (maybe) log the message.
            if (CTOS.Globals.m_Trace) {
                if (msg === "Idle") {
                    // We can't log every idle clock pulse because it would lag the browser very quickly.
                    if (CTOS.Globals.m_OSClock % 10 == 0) {
                        // Check the Globals.CPU_CLOCK_INTERVAL in globals.ts for an
                        // idea of the tick rate and adjust this line accordingly.
                        CTOS.Control.hostLog(msg, "OS");
                    }
                } else {
                    CTOS.Control.hostLog(msg, "OS");
                }
            }
        };

        Kernel.prototype.krnTrapError = function (msg) {
            var errorMsg = "OS ERROR - TRAP: " + msg;
            CTOS.Control.hostLog(errorMsg);
            CTOS.Globals.m_StdOut.putError("TRAP ERROR", errorMsg);
            this.krnShutdown();
        };
        return Kernel;
    })();
    CTOS.Kernel = Kernel;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=kernel.js.map
