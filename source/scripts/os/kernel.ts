/* ------------
     Kernel.ts

     Requires globals.ts

     Routines for the Operating System, NOT the host.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module CTOS 
{

    export class Kernel 
    {
        //
        // OS Startup and Shutdown Routines Pg 8
        //
        public Bootstrap() 
        { 
            Control.hostLog("bootstrap", "host");  // Use hostLog because we ALWAYS want this, even if _Trace is off.

            // Initialize our global queues.
            Globals.m_KernelInterruptQueue = new Queue();  // A (currently) non-priority queue for interrupt requests (IRQs).
            Globals.m_KernelBuffers = new Array();         // Buffers... for the kernel.
            Globals.m_KernelResidentQueue = new Queue();
            Globals.m_KernelReadyQueue = new Queue();
            Globals.m_KernelInputQueue = new Queue();      // Where device input lands before being processed out somewhere.
            Globals.m_Console = new Console();          // The command line interface / console I/O device.

            // Initialize the console.
            Globals.m_Console.Init();

            // Initialize standard input and output to the _Console.
            Globals.m_StdIn  = Globals.m_Console;
            Globals.m_StdOut = Globals.m_Console;

            // Load the Keyboard Device Driver
            this.Trace("Loading the keyboard device driver.");
            Globals.m_KrnKeyboardDriver = new DeviceDriverKeyboard();     // Construct it.
            Globals.m_KrnKeyboardDriver.driverEntry();                    // Call the driverEntry() initialization routine.
            this.Trace(Globals.m_KrnKeyboardDriver.status);

            //
            // ... more?
            //

            // Enable the OS Interrupts.  (Not the CPU clock interrupt, as that is done in the hardware sim.)
            this.Trace("Enabling the interrupts.");
            this.EnableInterrupts();

            // Launch the shell.
            this.Trace("Creating and Launching the shell.");
            Globals.m_OsShell = new Shell();
            Globals.m_OsShell.Init();

            // Finally, initiate testing.
            if (Globals.m_GLaDOS) 
            {
                Globals.m_GLaDOS.afterStartup();
            }
        }

        public Shutdown() : void
        {
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
        }


        public OnCPUClockPulse() : void
        {
            /* This gets called from the host hardware sim every time there is a hardware clock pulse.
               This is NOT the same as a TIMER, which causes an interrupt and is handled like other interrupts.
               This, on the other hand, is the clock pulse from the hardware (or host) that tells the kernel
               that it has to look for interrupts and process them if it finds any.                          
             */

            Control.ReadyQTableUpdate(Globals.m_KernelReadyQueue);
            // Check for an interrupt, are any. Page 560
            if (Globals.m_KernelInterruptQueue.getSize() > 0) 
            {
                // Process the first interrupt on the interrupt queue.
                // TODO: Implement a priority queue based on the IRQ number/id to enforce interrupt priority.
                var interrupt = Globals.m_KernelInterruptQueue.dequeue();
                this.InterruptHandler(interrupt.irq, interrupt.params);
            }
            else if (Globals.m_CPU.m_IsExecuting) 
            { 
                Globals.m_CPUScheduler.Cycle();
                // If there are no interrupts then run one CPU cycle if there is anything being processed. {
                Globals.m_CPU.Cycle();
            }
            else
            {   
                // If there are no interrupts and there is nothing being executed then just be idle. {
                this.Trace("Idle");
            }
        }


        //
        // Interrupt Handling
        //
        public EnableInterrupts() : void
        {
            // Keyboard
            Devices.HostEnableKeyboardInterrupt();
            // Put more here.
        }

        public KrnDisableInterrupts() : void
        {
            // Keyboard
            Devices.hostDisableKeyboardInterrupt();
            // Put more here.
        }

        public InterruptHandler(irq, params) : void
        {
            // This is the Interrupt Handler Routine.  Pages 8 and 560. {
            // Trace our entrance here so we can compute Interrupt Latency by analyzing the log file later on.  Page 766.
            this.Trace("Handling IRQ~" + irq);

            // Invoke the requested Interrupt Service Routine via Switch/Case rather than an Interrupt Vector.
            // TODO: Consider using an Interrupt Vector in the future.
            // Note: There is no need to "dismiss" or acknowledge the interrupts in our design here.
            //       Maybe the hardware simulation will grow to support/require that in the future.
            switch (irq)
            {
                case Globals.INTERRUPT_REQUEST_TIMER:
                    this.TimerISR();              // Kernel built-in routine for timers (not the clock).
                    break;
                case Globals.INTERRUPT_REQUEST_KEYBOARD:
                    Globals.m_KrnKeyboardDriver.isr(params);   // Kernel mode device driver
                    Globals.m_StdIn.HandleInput();
                    break;
                case Globals.INTERRUPT_REQUEST_CPU_RUN_PROGRAM: // Begin to run program
                    if (!Globals.m_CPU.m_IsExecuting)
                    {
                        Globals.m_CPU.RunProgram();
                    }
                    else
                    {
                        Globals.m_CPUScheduler.SetWaiting();
                    }
                    break;
                case Globals.INTERRUPT_REQUEST_SYS_CALL: // System call from CPU
                    Globals.m_StdOut.SysCall(params[0]);
                    break;
                case Globals.INTERRUPT_MEMORY_OUT_OF_BOUNDS: // Program tried to access out of memory block
                    Globals.m_AchievementSystem.Unlock(14);
                    Globals.m_CPU.EndProgram();
                    this.Trace("PID[" + params[0].toString() + "] went out of memory bounds @" + params[1].toString());
                    break;
                case Globals.INTERRUPT_INVALID_OP: // Operation we don't use was here. Get Hex
                    Globals.m_AchievementSystem.Unlock(15);
                    Globals.m_CPU.EndProgram();
                    this.Trace("PID[" + params[0].toString() + "] had an invalid op @" + params[1].GetHex());
                    break;
                case Globals.INTERRUPT_CPU_BRK:
                    // PCB is done executing or we've done some kind of context switch for P3
                    if (Globals.m_CurrentPCBExe)
                    {
                        if (Globals.m_CurrentPCBExe.m_State == ProcessControlBlock.STATE_TERMINATED)
                        {
                            Globals.m_StdOut.PutText("PID[" + Globals.m_CurrentPCBExe.m_PID.toString() + "] is done executing.");
                            Globals.m_StdOut.AdvanceLine(); // Hoping we don't interupt our output if any, get it? Interupt? hehe
                            Globals.m_OsShell.PutPrompt();
                        }
                        Globals.m_CurrentPCBExe = null;
                    }
                    Globals.m_CPUScheduler.OnCPUDoneExecuting();
                    break;
                default:
                    this.TrapError("Invalid Interrupt Request. irq=" + irq + " params=[" + params + "]");
            }
        }

        public TimerISR() : void
        {
            // The built-in TIMER (not clock) Interrupt Service Routine (as opposed to an ISR coming from a device driver). {
            // Check multiprogramming parameters and enforce quanta here. Call the scheduler / context switch here if necessary.
        }

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
        public Trace(msg: string): void
        {
             // Check globals to see if trace is set ON.  If so, then (maybe) log the message.
             if (Globals.m_Trace) {
                if (msg === "Idle") {
                    // We can't log every idle clock pulse because it would lag the browser very quickly.
                    if (Globals.m_OSClock % 10 == 0) {
                        // Check the Globals.CPU_CLOCK_INTERVAL in globals.ts for an
                        // idea of the tick rate and adjust this line accordingly.
                        Control.hostLog(msg, "OS");
                    }
                } else {
                    Control.hostLog(msg, "OS");
                }
             }
        }

        public TrapError(msg : string) : void
        {
            var errorMsg: string = "OS ERROR - TRAP: " + msg;
            Control.hostLog(errorMsg);

            //BSOD
            Globals.m_StdOut.DrawError("TRAP ERROR", errorMsg);

            // Shutdown! Stop input!
            Control.hostLog("Emergency halt", "TRAP ERROR");
            Control.hostLog("Attempting Kernel shutdown.", "BSOD");
            // Call the OS shutdown routine.
            Globals.m_Kernel.Shutdown();
            // Stop the interval that's simulating our clock pulse.
            clearInterval(Globals.m_HardwareClockID);
            this.Shutdown();
        }
    }
}
