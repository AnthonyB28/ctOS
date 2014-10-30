var CTOS;
(function (CTOS) {
    var CPUScheduler = (function () {
        function CPUScheduler(m_WaitingExe) {
            if (typeof m_WaitingExe === "undefined") { m_WaitingExe = false; }
            this.m_WaitingExe = m_WaitingExe;
        }
        CPUScheduler.prototype.SetWaiting = function () {
            this.m_WaitingExe = true;
        };

        CPUScheduler.prototype.IsWaiting = function () {
            return this.m_WaitingExe;
        };

        CPUScheduler.prototype.DoneExecuting = function () {
            if (this.m_WaitingExe) {
                if (CTOS.Globals.m_KernelReadyQueue.getSize() > 0) {
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
