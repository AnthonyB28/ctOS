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
            // Create a new PCB, give it a PID, set the base & limit of the program memory
            var pcb = new CTOS.ProcessControlBlock();
            var memoryBlockLocation = this.GetAvailableMemoryLocation();
            pcb.m_MemBase = memoryBlockLocation * 256;
            pcb.m_MemLimit = memoryBlockLocation * 255 + 255; // TODO: concern for P3
            pcb.m_State = CTOS.ProcessControlBlock.STATE_NEW;

            // Reset memory block & update display
            this.m_Memory[memoryBlockLocation].Reset();
            CTOS.Control.MemoryTableResetBlock(memoryBlockLocation);

            for (var i = pcb.m_MemBase; i < pcb.m_MemBase + program.length; ++i) {
                var address = i % 256;
                this.m_Memory[memoryBlockLocation].Set(address, program[address]);
                CTOS.Control.MemoryTableUpdateByte(address, program[address]);
            }

            this.m_MemInUse[memoryBlockLocation] = true;
            CTOS.Globals.m_KernelResidentQueue.enqueue(pcb);
            return pcb.m_PID;
        };

        // Gets the byte from memory using address
        // TODO assumes P2 where we only do 256 bytes and only sector 0 in memory
        MemoryManager.prototype.GetByte = function (address) {
            if (address >= 256) {
                this.OutOfBoundsRequest(address);
            } else {
                return this.m_Memory[0].Get(address);
            }
        };

        // Set the byte @ address in memory with value in hex
        // TODO assumes P2 where we only do 256 bytes and only block 0 in memory
        MemoryManager.prototype.SetByte = function (address, hexValue) {
            if (address >= 256) {
                this.OutOfBoundsRequest(address);
            } else {
                this.m_Memory[0].Set(address, hexValue);
                CTOS.Control.MemoryTableUpdateByte(address, hexValue);
            }
        };

        // Memory was attempted to be accessed out of bounds
        MemoryManager.prototype.OutOfBoundsRequest = function (address) {
            var params = new Array();
            var pcb = CTOS.Globals.m_KernelReadyQueue.peek(0);
            params[0] = pcb[0].m_PID; // WHAT IS THIS? I dont have this issue elsewhere. Its undefined if I dont treat pcb like an array..
            params[1] = address;
            CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_MEMORY_OUT_OF_BOUNDS, params));
        };
        return MemoryManager;
    })();
    CTOS.MemoryManager = MemoryManager;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=memoryManager.js.map
