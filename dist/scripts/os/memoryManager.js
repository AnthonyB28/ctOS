/* ------------
Memory Manager
Part of the OS that organizes, controls, and communicates with our memory rescources.
Each block of memory is 256
------------ */
var CTOS;
(function (CTOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
            this.m_MemInUse = new Array();
            this.m_Memory = new Array();
            for (var i = 0; i < MemoryManager.MAX_MEMORY_BLOCKS; ++i) {
                this.m_Memory[i] = new CTOS.Memory();
                this.m_MemInUse[i] = false;
            }
        }
        // Resets memory and makes it available given the base of the memory block in bytes
        MemoryManager.prototype.UnlockMemory = function (memBase) {
            var memBlock = Math.floor(memBase / MemoryManager.MAX_MEMORY);
            this.m_Memory[memBlock] = new CTOS.Memory();
            this.m_MemInUse[memBlock] = false;
        };

        // Gets the first available memory block not in use, not needed for P2
        MemoryManager.prototype.GetAvailableMemoryLocation = function () {
            var availableMemory = 0;
            for (var i = 0; i < this.m_MemInUse.length; ++i) {
                if (!this.m_MemInUse[i]) {
                    availableMemory = i;
                    break;
                }
                if (i == this.m_MemInUse.length - 1) {
                    availableMemory = -1;
                }
            }

            return availableMemory;
        };

        // Loads the program into memory & returns PID
        MemoryManager.prototype.LoadProgram = function (program, priority) {
            // Create a new PCB, give it a PID, set the base & limit of the program memory
            var pcb = new CTOS.ProcessControlBlock();
            pcb.m_Priority = priority;
            var memoryBlockLocation = this.GetAvailableMemoryLocation();
            if (memoryBlockLocation == -1) {
                // OUT OF MEMORY!
                var data = "";
                for (var i = 0; i < program.length; ++i) {
                    data += program[i];
                }
                if (!CTOS.Globals.m_KrnHardDriveDriver.IsSupported() || !CTOS.Globals.m_KrnHardDriveDriver.SwapWrite(pcb, data)) {
                    return -1;
                }
            } else {
                // Base = (block * 256) e.g 3 * 256 = 768 start there for 0
                pcb.m_MemBase = memoryBlockLocation * MemoryManager.MAX_MEMORY;

                // Limit = base + 256 (e.g 2 block = 768 limit but 767 array)
                pcb.m_MemLimit = pcb.m_MemBase + MemoryManager.MAX_MEMORY - 1;

                // Reset memory block & update display
                this.m_Memory[memoryBlockLocation].Reset();
                CTOS.Control.MemoryTableResetBlock(memoryBlockLocation);

                for (var i = 0; i < MemoryManager.MAX_MEMORY; ++i) {
                    if (i >= program.length) {
                        break;
                    }

                    this.m_Memory[memoryBlockLocation].Set(i, program[i]);
                    CTOS.Control.MemoryTableUpdateByte(i + pcb.m_MemBase, program[i]);
                }

                this.m_MemInUse[memoryBlockLocation] = true; // Don't use this block of memory again while in use!
            }

            pcb.m_State = CTOS.ProcessControlBlock.STATE_NEW;
            CTOS.Globals.m_KernelResidentQueue.enqueue(pcb);
            return pcb.m_PID;
        };

        MemoryManager.prototype.SwapMemory = function (dataToWrite, memBase, memLimit) {
            var outData = "";

            for (var i = 0; i < 256; ++i) {
                var byte = this.GetByte(i, memBase);
                var hex = byte.GetHex();
                var hexPad = "";
                if (hex.length == 1) {
                    hexPad += "0" + hex;
                } else {
                    hexPad = hex;
                }
                outData += hexPad;
            }

            // Reset memory
            var memBlock = Math.floor(memBase / MemoryManager.MAX_MEMORY);
            this.m_Memory[memBlock] = new CTOS.Memory();

            var bytesToWrite = dataToWrite.match(/.{2}/g);

            for (var i = 0; i < 256; ++i) {
                this.SetByte(i, bytesToWrite[i]);
            }

            return outData;
        };

        // Gets the byte from memory using address
        MemoryManager.prototype.GetByte = function (address, base) {
            if (typeof base === "undefined") { base = null; }
            var memBase = 0;
            if (CTOS.Globals.m_CurrentPCBExe) {
                memBase = CTOS.Globals.m_CurrentPCBExe.m_MemBase;
            }
            if (base) {
                memBase = base;
            }

            var physicalAddress = address + memBase;
            var translatedBlock = Math.floor(physicalAddress / MemoryManager.MAX_MEMORY);
            var translatedAddress = physicalAddress % MemoryManager.MAX_MEMORY;
            if (address >= MemoryManager.MAX_MEMORY) {
                this.OutOfBoundsRequest(address);
            } else {
                return this.m_Memory[translatedBlock].Get(address);
            }
        };

        // Set the byte @ address in memory with value in hex
        MemoryManager.prototype.SetByte = function (address, hexValue, base) {
            if (typeof base === "undefined") { base = null; }
            var memBase = 0;
            if (CTOS.Globals.m_CurrentPCBExe) {
                memBase = CTOS.Globals.m_CurrentPCBExe.m_MemBase;
            }
            if (base) {
                memBase = base;
            }
            var physicalAddress = address + memBase;
            var translatedBlock = Math.floor(physicalAddress / MemoryManager.MAX_MEMORY);
            var translatedAddress = physicalAddress % MemoryManager.MAX_MEMORY;
            if (address >= MemoryManager.MAX_MEMORY) {
                this.OutOfBoundsRequest(address);
            } else {
                this.m_Memory[translatedBlock].Set(address, hexValue);
                CTOS.Control.MemoryTableUpdateByte(physicalAddress, hexValue);
            }
        };

        // Memory was attempted to be accessed out of bounds
        MemoryManager.prototype.OutOfBoundsRequest = function (address) {
            var params = new Array();
            params[0] = CTOS.Globals.m_CurrentPCBExe.m_PID;
            params[1] = address;
            CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_MEMORY_OUT_OF_BOUNDS, params));
        };

        MemoryManager.prototype.ClearMemory = function () {
            for (var i = 0; i < MemoryManager.MAX_MEMORY_BLOCKS; ++i) {
                this.m_Memory[i].Reset();
                CTOS.Control.MemoryTableResetBlock(i);
                this.m_MemInUse[i] = false;
            }
        };
        MemoryManager.MAX_MEMORY = 256;
        MemoryManager.MAX_MEMORY_BLOCKS = 3;
        return MemoryManager;
    })();
    CTOS.MemoryManager = MemoryManager;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=memoryManager.js.map
