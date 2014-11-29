/* ------------
Process Control Block
Part of the OS kernel to manage a process.
GPID is the global PID that will increment on every new instance.
Due to the fact it is static, it will not increase the size of -
the class... theoretically.
------------ */
var CTOS;
(function (CTOS) {
    var ProcessControlBlock = (function () {
        function ProcessControlBlock() {
            this.m_State = 0;
            this.m_PID = ++ProcessControlBlock.m_GPID;
            this.m_Priority = 0;
            this.m_Counter = 0;
            this.m_Accumulator = 0;
            this.m_X = 0;
            this.m_Y = 0;
            this.m_Z = 0;
            this.m_MemBase = 0;
            this.m_MemLimit = 0;
            this.m_SwapTSB = "@@@";
        }
        ProcessControlBlock.m_GPID = -1;
        ProcessControlBlock.STATE_NEW = 0;
        ProcessControlBlock.STATE_RUNNING = 1;
        ProcessControlBlock.STATE_WAITING = 2;
        ProcessControlBlock.STATE_READY = 3;
        ProcessControlBlock.STATE_TERMINATED = 4;
        return ProcessControlBlock;
    })();
    CTOS.ProcessControlBlock = ProcessControlBlock;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=processControlBlock.js.map
