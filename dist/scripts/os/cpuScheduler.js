var CTOS;
(function (CTOS) {
    var CPUScheduler = (function () {
        function CPUScheduler(m_WaitingExe, m_Quantum, m_CPUCyles, m_SchedulerType) {
            if (typeof m_WaitingExe === "undefined") { m_WaitingExe = false; }
            if (typeof m_Quantum === "undefined") { m_Quantum = 6; }
            if (typeof m_CPUCyles === "undefined") { m_CPUCyles = 0; }
            if (typeof m_SchedulerType === "undefined") { m_SchedulerType = 0; }
            this.m_WaitingExe = m_WaitingExe;
            this.m_Quantum = m_Quantum;
            this.m_CPUCyles = m_CPUCyles;
            this.m_SchedulerType = m_SchedulerType;
        }
        // Sets waiting to true and mode bit to user mode.
        // Will signal to the CPUScheduler that it can context switch
        CPUScheduler.prototype.SetWaiting = function () {
            CTOS.Globals.m_Mode = 1; // User mode
            this.m_WaitingExe = true;
        };

        // Sets the scheduling algo we use
        // 0 for Round Robin
        // 1 for FirstComeFirstServe
        // 2 for Priority
        CPUScheduler.prototype.SetType = function (t) {
            this.m_SchedulerType = t;
            CTOS.Control.SetSchedule(t);
        };

        CPUScheduler.prototype.GetType = function () {
            return this.m_SchedulerType;
        };

        CPUScheduler.prototype.IsWaiting = function () {
            return this.m_WaitingExe;
        };

        CPUScheduler.prototype.SetQuantum = function (quantum) {
            this.m_Quantum = quantum;
        };

        // Call back from the CPU when it cycles
        CPUScheduler.prototype.OnCPUCycle = function () {
            ++this.m_CPUCyles;
        };

        // Checks if the CPUScheduler needs to context switch
        CPUScheduler.prototype.Cycle = function () {
            if (this.m_SchedulerType == 0) {
                // Round Robin = if the cycles go over our Quantum, kick process off the swings
                // Quantum -1 because CPU cycle is garunteed to occur when the scheduler is done. If a switch is needed,
                // it is queued as an interupt. That would mean that the switch would occur at cycle 7, instead of 6, if q = 6
                if (this.m_CPUCyles >= this.m_Quantum - 1) {
                    this.ContextSwitch();
                }
            } else if (this.m_SchedulerType == 1) {
                // First Come First Serve
                // Does anything even need to be done here?
            } else {
                // NonPreemptive Priority - smallest integer = greatest p
                // Let the executing process finish before doing a context switch
                // May want to implement something to help starvation (age the low priority processes)
                // Wait... do we need anything here either? LOL
            }
        };

        // Scheduling needs to force the CPU to stop running program
        // and switch to next program if available
        CPUScheduler.prototype.ContextSwitch = function () {
            // Only switch if the CPU is executing and there are processes waiting in the ReadyQueue
            if (this.m_WaitingExe && CTOS.Globals.m_CPU.m_IsExecuting) {
                CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_CPU_CNTXSWTCH, false));
            } else {
                this.m_CPUCyles = 0;
            }
        };

        // Callback from the Kernel if a context switch was necessary
        // Resets CPU cycles to 0.
        CPUScheduler.prototype.OnContextSwitchInterrupt = function () {
            this.m_CPUCyles = 0;
        };

        // Forcibly stops the currently running process on the CPU. Called from shellKill cmd
        // Executes context switch without any check
        CPUScheduler.prototype.ForceKillRunningProcess = function () {
            CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_CPU_CNTXSWTCH, true));
        };

        // Determines if rollout is necessary and performs it. Returns true if successful or didn't need to occur & false if error writing
        // writeRollout is true if roll needs to write to page
        CPUScheduler.prototype.CheckRollOut = function (writeRollout) {
            if (CTOS.Globals.m_KernelReadyQueue.getSize() > 1) {
                var pcbOut = CTOS.Globals.m_KernelReadyQueue.peek(0);
                var pcbIn = CTOS.Globals.m_KernelReadyQueue.peek(1);
                if (pcbIn.m_SwapTSB != CTOS.DeviceDriverHardDrive.TSB_INVALID) {
                    return this.Roll(pcbIn, pcbOut, writeRollout);
                }
            }
            return true;
        };

        // Performs roll in with pcbIn. Set rollOut to true to do roll out - writing the program out to page
        CPUScheduler.prototype.Roll = function (pcbIn, pcbOut, rollOut) {
            // Need to pull memory of pcbOut, write data of pcbIn to freed memory, write pcbOut data display
            var inData = CTOS.Globals.m_KrnHardDriveDriver.SwapReadClear(pcbIn);
            var outData = CTOS.Globals.m_MemoryManager.SwapMemory(inData, pcbOut.m_MemBase, pcbOut.m_MemLimit);
            pcbIn.m_MemBase = pcbOut.m_MemBase;
            pcbIn.m_MemLimit = pcbOut.m_MemLimit;

            pcbOut.m_MemBase = 0;
            pcbOut.m_MemLimit = 0;

            CTOS.Globals.m_Kernel.Trace("Program swap PID[" + pcbOut.m_PID.toString() + "] with PID[" + pcbIn.m_PID.toString() + "]");

            // Don't write out data to drive. E.g program has terminated, doesnt need to be put back into drive
            if (rollOut) {
                if (CTOS.Globals.m_KrnHardDriveDriver.SwapWrite(pcbOut, outData)) {
                    //Globals.m_OsShell.PutTextLine("Succesfull swap -" + pcbOut.m_PID.toString() + " to " + pcbIn.m_PID.toString());
                    return true;
                } else {
                    CTOS.Globals.m_CPU.m_IsExecuting = false;
                    return false;
                }
            }
        };

        // Returns if rollout had occured based on the PCB
        // CPU uses this to determine if memory needs to be erased.
        CPUScheduler.prototype.RolloutOccured = function (pcb) {
            return pcb.m_SwapTSB == CTOS.DeviceDriverHardDrive.TSB_INVALID ? true : false;
        };

        // When a process is done executing, this is the callback from the CPU
        CPUScheduler.prototype.OnCPUDoneExecuting = function () {
            // If there is more in the ready queue that have been loaded
            if (this.m_WaitingExe) {
                var sizeOfReadyQueue = CTOS.Globals.m_KernelReadyQueue.getSize();
                if (sizeOfReadyQueue > 0) {
                    if (sizeOfReadyQueue == 1) {
                        this.m_WaitingExe = false;
                        var pcb = CTOS.Globals.m_KernelReadyQueue.peek(0);
                        if (pcb.m_SwapTSB != CTOS.DeviceDriverHardDrive.TSB_INVALID) {
                            this.Roll(pcb, CTOS.Globals.m_CurrentPCBExe, false);
                        }
                    }
                    CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_REQUEST_CPU_RUN_PROGRAM, null));
                } else {
                    this.m_WaitingExe = false;
                    CTOS.Globals.m_Mode = 0; // Kernel Mode
                }
            } else {
                CTOS.Globals.m_Mode = 0; // Kernel Mode
            }
        };

        CPUScheduler.PrioritySort = function (a, b) {
            if (a.m_Priority < b.m_Priority) {
                return -1;
            } else if (a.m_Priority > b.m_Priority) {
                return 1;
            } else {
                return 0;
            }
        };
        return CPUScheduler;
    })();
    CTOS.CPUScheduler = CPUScheduler;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=cpuScheduler.js.map
