var CTOS;
(function (CTOS) {
    var CPUScheduler = (function () {
        function CPUScheduler(m_WaitingExe, m_Quantum) {
            if (typeof m_WaitingExe === "undefined") { m_WaitingExe = false; }
            if (typeof m_Quantum === "undefined") { m_Quantum = 6; }
            this.m_WaitingExe = m_WaitingExe;
            this.m_Quantum = m_Quantum;
        }
        CPUScheduler.prototype.SetWaiting = function () {
            this.m_WaitingExe = true;
        };

        CPUScheduler.prototype.IsWaiting = function () {
            return this.m_WaitingExe;
        };

        CPUScheduler.prototype.SetQuantum = function (quantum) {
            this.m_Quantum = quantum;
        };

        CPUScheduler.prototype.Cycle = function () {
        };

        // Scheduling needs to force the CPU to stop running program
        // and switch to next program if available
        CPUScheduler.prototype.ContextSwitch = function () {
            if (this.m_WaitingExe && CTOS.Globals.m_CPU.m_IsExecuting) {
                CTOS.Globals.m_CPU.ContextSwitch(false); // Don't terminate the running process, just switch
            }
        };

        // Forcibly stops the currently running process on the CPU.
        // Executes context switch without any check
        CPUScheduler.prototype.ForceKillRunningProcess = function () {
            CTOS.Globals.m_CPU.ContextSwitch(true);
        };

        CPUScheduler.prototype.DoneExecuting = function () {
            if (this.m_WaitingExe) {
                var sizeOfReadyQueue = CTOS.Globals.m_KernelReadyQueue.getSize();
                if (sizeOfReadyQueue > 0) {
                    if (sizeOfReadyQueue == 1) {
                        this.m_WaitingExe = false;
                    }
                    CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_REQUEST_CPU_RUN_PROGRAM, null));
                } else {
                    this.m_WaitingExe = false;
                }
            }
        };
        return CPUScheduler;
    })();
    CTOS.CPUScheduler = CPUScheduler;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=cpuScheduler.js.map
