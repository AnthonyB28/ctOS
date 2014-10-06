/* ------------
Process Control Block
Part of the OS kernel to manage a process.
------------ */
var CTOS;
(function (CTOS) {
    var ProcessControlBlock = (function () {
        function ProcessControlBlock() {
            // 0 = new ; 1 = running ; 2 = waiting ; 3 = ready; 4 = terminated
            this.m_State = 0;
            this.m_PID = 0;
            this.m_Counter = 0;
            this.m_Accumulator = 0;
            this.m_X = 0;
            this.m_Y = 0;
            this.m_Z = false;
            this.m_MemBase = 0;
            this.m_MemLimit = 0;
        }
        return ProcessControlBlock;
    })();
    CTOS.ProcessControlBlock = ProcessControlBlock;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=processControlBlock.js.map
