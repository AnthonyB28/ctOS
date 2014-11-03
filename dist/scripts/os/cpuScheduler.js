var CTOS;
(function (CTOS) {
    var CPUScheduler = (function () {
        function CPUScheduler(m_WaitingExe, m_Quantum, m_CPUCyles) {
            if (typeof m_WaitingExe === "undefined") { m_WaitingExe = false; }
            if (typeof m_Quantum === "undefined") { m_Quantum = 6; }
            if (typeof m_CPUCyles === "undefined") { m_CPUCyles = 0; }
            this.m_WaitingExe = m_WaitingExe;
            this.m_Quantum = m_Quantum;
            this.m_CPUCyles = m_CPUCyles;
        }
        // Sets waiting to true and mode bit to user mode.
        // Will signal to the CPUScheduler that it can context switch
        CPUScheduler.prototype.SetWaiting = function () {
            CTOS.Globals.m_Mode = 1; // User mode
            this.m_WaitingExe = true;
        };

        CPUScheduler.prototype.IsWaiting = function () {
            return this.m_WaitingExe;
        };

        CPUScheduler.prototype.SetQuantum = function (quantum) {
            this.m_Quantum = quantum;
        };

        CPUScheduler.prototype.OnCPUCycle = function () {
            ++this.m_CPUCyles;
        };

        // Checks if the CPUScheduler needs to context switch
        CPUScheduler.prototype.Cycle = function () {
            // Round Robin = if the cycles go over our Quantum, kick process off the swings
            if (this.m_CPUCyles >= this.m_Quantum) {
                this.ContextSwitch();
            }
        };

        // Scheduling needs to force the CPU to stop running program
        // and switch to next program if available
        CPUScheduler.prototype.ContextSwitch = function () {
            // Only switch if the CPU is executing and there are processes waiting in the ReadyQueue
            if (this.m_WaitingExe && CTOS.Globals.m_CPU.m_IsExecuting) {
                CTOS.Globals.m_CPU.ContextSwitch(false); // Don't terminate the running process, just switch
            }

            this.m_CPUCyles = 0;
        };

        // Forcibly stops the currently running process on the CPU.
        // Executes context switch without any check
        CPUScheduler.prototype.ForceKillRunningProcess = function () {
            CTOS.Globals.m_CPU.ContextSwitch(true);
        };

        // When a process is done executing, this is the callback from the CPU
        CPUScheduler.prototype.OnCPUDoneExecuting = function () {
            // If there is more in the ready queue that have been loaded
            if (this.m_WaitingExe) {
                var sizeOfReadyQueue = CTOS.Globals.m_KernelReadyQueue.getSize();
                if (sizeOfReadyQueue > 0) {
                    if (sizeOfReadyQueue == 1) {
                        this.m_WaitingExe = false;
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
        return CPUScheduler;
    })();
    CTOS.CPUScheduler = CPUScheduler;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=cpuScheduler.js.map
