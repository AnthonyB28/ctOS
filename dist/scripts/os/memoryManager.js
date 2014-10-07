/* ------------
Memory Manager
Part of the OS that organizes, controls, and communicates with our memory rescources.
Each block of memory is 256
------------ */
var CTOS;
(function (CTOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
            this.m_Memory = new Array();
            this.m_Memory[0] = new CTOS.Memory(); // for now we shall only have 1 set of 256 bytes of memory
            this.m_MemInUse = new Array();
        }
        // Gets the first available memory block not in use, not needed for P2
        MemoryManager.prototype.GetAvailableMemoryLocation = function () {
            var availableMemory = 0;
            for (var i = 0; i < this.m_MemInUse.length; ++i) {
                if (!this.m_MemInUse[i]) {
                    availableMemory = i;
                }
            }

            return availableMemory;
        };

        // Loads the program into memory & returns PID
        MemoryManager.prototype.LoadProgram = function (program) {
            var memBlock = new CTOS.Memory();
            var memoryAddress = 0;
            for (var i = 0; i < program.length; ++i) {
                memBlock.set(i, program[i]);
            }
            var memoryBlockLocation = this.GetAvailableMemoryLocation();
            this.m_MemInUse[memoryBlockLocation] = true;
            this.m_Memory[memoryBlockLocation] = memBlock;

            // Create a new PCB, give it a PID, set the base & limit of the program memory
            var pcb = new CTOS.ProcessControlBlock();
            pcb.m_MemBase = memoryBlockLocation * 256;
            pcb.m_MemLimit = memoryBlockLocation * 255 + 255; // TODO: concern for P3
            CTOS.Globals.m_KernelResidentQueue.enqueue(pcb);

            return pcb.m_PID;
        };

        // Gets the byte from memory using address
        // TODO assumes P2 where we only do 256 bytes and only sector 0 in memory
        MemoryManager.prototype.GetByte = function (address) {
            if (address >= 256) {
                return this.GetByte(address - 256);
            } else {
                return this.m_Memory[0].get(address);
            }
        };

        MemoryManager.prototype.SetByte = function (address, hexValue) {
            if (address >= 256) {
                this.SetByte(address - 256, hexValue); // loop around if we're larger than 255
            } else {
                this.m_Memory[0].set(address, hexValue);
            }
        };
        return MemoryManager;
    })();
    CTOS.MemoryManager = MemoryManager;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=memoryManager.js.map
