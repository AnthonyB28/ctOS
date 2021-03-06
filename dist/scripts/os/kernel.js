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
        // OS Startup and Shutdown Routines Pg 8
        //
        Kernel.prototype.Bootstrap = function () {
            CTOS.Control.hostLog("bootstrap", "host"); // Use hostLog because we ALWAYS want this, even if _Trace is off.

            // Initialize our global queues.
            CTOS.Globals.m_KernelInterruptQueue = new CTOS.Queue(); // A (currently) non-priority queue for interrupt requests (IRQs).
            CTOS.Globals.m_KernelBuffers = new Array(); // Buffers... for the kernel.
            CTOS.Globals.m_KernelResidentQueue = new CTOS.Queue();
            CTOS.Globals.m_KernelReadyQueue = new CTOS.Queue();
            CTOS.Globals.m_KernelInputQueue = new CTOS.Queue(); // Where device input lands before being processed out somewhere.
            CTOS.Globals.m_Console = new CTOS.Console(); // The command line interface / console I/O device.

            // Initialize the console.
            CTOS.Globals.m_Console.Init();

            // Initialize standard input and output to the _Console.
            CTOS.Globals.m_StdIn = CTOS.Globals.m_Console;
            CTOS.Globals.m_StdOut = CTOS.Globals.m_Console;

            // Load the device drivers
            this.Trace("Loading the keyboard device driver.");
            CTOS.Globals.m_KrnKeyboardDriver = new CTOS.DeviceDriverKeyboard(); // Construct it.
            CTOS.Globals.m_KrnKeyboardDriver.driverEntry(); // Call the driverEntry() initialization routine.
            this.Trace(CTOS.Globals.m_KrnKeyboardDriver.status);
            this.Trace("Loading the hard drive device driver.");
            CTOS.Globals.m_KrnHardDriveDriver = new CTOS.DeviceDriverHardDrive();
            CTOS.Globals.m_KrnHardDriveDriver.driverEntry();
            this.Trace(CTOS.Globals.m_KrnHardDriveDriver.status);
            CTOS.Control.BootVideoPlay();

            //
            // ... more?
            //
            // Enable the OS Interrupts.  (Not the CPU clock interrupt, as that is done in the hardware sim.)
            this.Trace("Enabling the interrupts.");
            this.EnableInterrupts();

            // Launch the shell.
            this.Trace("Creating and Launching the shell.");
            CTOS.Globals.m_OsShell = new CTOS.Shell();
            CTOS.Globals.m_OsShell.Init();

            // Finally, initiate testing.
            if (CTOS.Globals.m_GLaDOS) {
                CTOS.Globals.m_GLaDOS.afterStartup();
            }
        };

        Kernel.prototype.Shutdown = function () {
            this.Trace("begin shutdown OS");

            // TODO: Check for running processes.  Alert if there are some, alert and stop.  Else...
            // ... Disable the Interrupts.
            this.Trace("Disabling the interrupts.");
            this.KrnDisableInterrupts();

            //
            // Unload the Device Drivers?
            // More?
            //
            this.Trace("end shutdown OS");
        };

        Kernel.prototype.OnCPUClockPulse = function () {
            /* This gets called from the host hardware sim every time there is a hardware clock pulse.
            This is NOT the same as a TIMER, which causes an interrupt and is handled like other interrupts.
            This, on the other hand, is the clock pulse from the hardware (or host) that tells the kernel
            that it has to look for interrupts and process them if it finds any.
            */
            CTOS.Control.ReadyQTableUpdate(CTOS.Globals.m_KernelReadyQueue);

            // Check for an interrupt, are any. Page 560
            if (CTOS.Globals.m_KernelInterruptQueue.getSize() > 0) {
                // Process the first interrupt on the interrupt queue.
                // TODO: Implement a priority queue based on the IRQ number/id to enforce interrupt priority.
                var interrupt = CTOS.Globals.m_KernelInterruptQueue.dequeue();
                this.InterruptHandler(interrupt.irq, interrupt.params);
            } else if (CTOS.Globals.m_CPU.m_IsExecuting) {
                CTOS.Globals.m_CPUScheduler.Cycle();

                // If there are no interrupts then run one CPU cycle if there is anything being processed. {
                CTOS.Globals.m_CPU.Cycle();
            } else {
                // If there are no interrupts and there is nothing being executed then just be idle. {
                this.Trace("Idle");
            }
        };

        //
        // Interrupt Handling
        //
        Kernel.prototype.EnableInterrupts = function () {
            // Keyboard
            CTOS.Devices.HostEnableKeyboardInterrupt();
            // Put more here.
        };

        Kernel.prototype.KrnDisableInterrupts = function () {
            // Keyboard
            CTOS.Devices.hostDisableKeyboardInterrupt();
            // Put more here.
        };

        Kernel.prototype.InterruptHandler = function (irq, params) {
            // This is the Interrupt Handler Routine.  Pages 8 and 560. {
            // Trace our entrance here so we can compute Interrupt Latency by analyzing the log file later on.  Page 766.
            this.Trace("Handling IRQ~" + irq);

            switch (irq) {
                case CTOS.Globals.INTERRUPT_REQUEST_TIMER:
                    this.TimerISR(); // Kernel built-in routine for timers (not the clock).
                    break;
                case CTOS.Globals.INTERRUPT_REQUEST_KEYBOARD:
                    CTOS.Globals.m_KrnKeyboardDriver.isr(params); // Kernel mode device driver
                    CTOS.Globals.m_StdIn.HandleInput();
                    break;
                case CTOS.Globals.INTERRUPT_REQUEST_CPU_RUN_PROGRAM:
                    if (!CTOS.Globals.m_CPU.m_IsExecuting) {
                        CTOS.Globals.m_CPU.RunProgram();
                    } else {
                        CTOS.Globals.m_CPUScheduler.SetWaiting();
                    }
                    break;
                case CTOS.Globals.INTERRUPT_REQUEST_SYS_CALL:
                    CTOS.Globals.m_StdOut.SysCall(params[0]);
                    break;
                case CTOS.Globals.INTERRUPT_MEMORY_OUT_OF_BOUNDS:
                    CTOS.Globals.m_AchievementSystem.Unlock(14);
                    CTOS.Globals.m_CPU.EndProgram();
                    this.Trace("PID[" + params[0].toString() + "] went out of memory bounds @" + params[1].toString());
                    break;
                case CTOS.Globals.INTERRUPT_INVALID_OP:
                    CTOS.Globals.m_AchievementSystem.Unlock(15);
                    CTOS.Globals.m_CPU.EndProgram();
                    this.Trace("PID[" + params[0].toString() + "] had an invalid op @" + params[1].GetHex());
                    break;
                case CTOS.Globals.INTERRUPT_CPU_BRK:
                    // PCB is done executing or we've done some kind of context switch for P3
                    CTOS.Globals.m_CPUScheduler.OnCPUDoneExecuting();
                    if (CTOS.Globals.m_CurrentPCBExe) {
                        if (CTOS.Globals.m_CurrentPCBExe.m_State == CTOS.ProcessControlBlock.STATE_TERMINATED) {
                            CTOS.Globals.m_StdOut.PutText("PID[" + CTOS.Globals.m_CurrentPCBExe.m_PID.toString() + "] is done executing.");
                            CTOS.Globals.m_StdOut.AdvanceLine(); // Hoping we don't interupt our output if any, get it? Interupt? hehe
                            CTOS.Globals.m_OsShell.PutPrompt();
                        }
                        CTOS.Globals.m_CurrentPCBExe = null;
                    }

                    break;
                case CTOS.Globals.INTERRUPT_CPU_CNTXSWTCH:
                    CTOS.Globals.m_CPUScheduler.OnContextSwitchInterrupt();
                    if (CTOS.Globals.m_CPUScheduler.CheckRollOut(true)) {
                        CTOS.Globals.m_CPU.ContextSwitch(params);
                        if (params) {
                            this.Trace("Context switch occured. Forced PCB off ready queue");
                        } else {
                            this.Trace("Context switch occured. Round Robin.");
                        }
                    } else {
                        this.Trace("Error swapping! Broke CPU");
                    }
                    break;
                case CTOS.Globals.INTERRUPT_REQUEST_HD:
                    CTOS.Globals.m_KrnHardDriveDriver.isr(params);
                    this.Trace("Hard Drive interrupt params=[" + params + "]");
                    break;
                default:
                    this.TrapError("Invalid Interrupt Request. irq=" + irq + " params=[" + params + "]");
            }
        };

        Kernel.prototype.TimerISR = function () {
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
        Kernel.prototype.Trace = function (msg) {
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

        Kernel.prototype.TrapError = function (msg) {
            var errorMsg = "OS ERROR - TRAP: " + msg;
            CTOS.Control.hostLog(errorMsg);

            //BSOD
            CTOS.Globals.m_StdOut.DrawError("TRAP ERROR", errorMsg);

            // Shutdown! Stop input!
            CTOS.Control.hostLog("Emergency halt", "TRAP ERROR");
            CTOS.Control.hostLog("Attempting Kernel shutdown.", "BSOD");

            // Call the OS shutdown routine.
            CTOS.Globals.m_Kernel.Shutdown();

            // Stop the interval that's simulating our clock pulse.
            clearInterval(CTOS.Globals.m_HardwareClockID);
            this.Shutdown();
        };
        return Kernel;
    })();
    CTOS.Kernel = Kernel;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=kernel.js.map
