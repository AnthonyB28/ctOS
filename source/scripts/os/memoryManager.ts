/* ------------
    Memory Manager
   
    Part of the OS that organizes, controls, and communicates with our memory rescources.
    Each block of memory is 256
    ------------ */   

module CTOS
{
    export class MemoryManager
    {
        static MAX_MEMORY: number = 256;
        static MAX_MEMORY_BLOCKS: number = 3;
        private m_Memory: Array<Memory>; // Representation of memory in our machine.
        private m_MemInUse: Array<boolean>; // List of blocks in use.

        constructor()
        {
            this.m_Memory = new Array<Memory>();
            this.m_Memory[MemoryManager.MAX_MEMORY_BLOCKS] = new Memory(); // for now we shall only have 1 set of 256 bytes of memory
            this.m_MemInUse = new Array<boolean>();
        }

        // Gets the first available memory block not in use, not needed for P2
        private GetAvailableMemoryLocation(): number
        {
            var availableMemory: number = 0;
            for (var i: number = 0; i < this.m_MemInUse.length; ++i)
            {
                if (!this.m_MemInUse[i])
                {
                    availableMemory = i;
                }
            }

            return availableMemory;
        }

        // Loads the program into memory & returns PID
        public LoadProgram(program: Array<string>): number
        {
            // Create a new PCB, give it a PID, set the base & limit of the program memory
            var pcb: ProcessControlBlock = new ProcessControlBlock();
            var memoryBlockLocation: number = this.GetAvailableMemoryLocation();
            // Base = (block * 256) e.g 3 * 256 = 768 start there for 0
            pcb.m_MemBase = memoryBlockLocation * MemoryManager.MAX_MEMORY; 
            // Limit = base + 256 (e.g 2 block = 768 limit but 767 array)
            pcb.m_MemLimit = pcb.m_MemBase + MemoryManager.MAX_MEMORY - 1;
            pcb.m_State = ProcessControlBlock.STATE_NEW;

            // Reset memory block & update display
            this.m_Memory[memoryBlockLocation].Reset();
            Control.MemoryTableResetBlock(memoryBlockLocation);

            // Load our program into the block of memory
            for (var i: number = pcb.m_MemBase; i <= pcb.m_MemLimit; ++i)
            {
                var address: number = i % MemoryManager.MAX_MEMORY;
                this.m_Memory[memoryBlockLocation].Set(address, program[address]);
                Control.MemoryTableUpdateByte(address, program[address]);
            }
            
            this.m_MemInUse[memoryBlockLocation] = true; // Don't use this block of memory again while in use!
            Globals.m_KernelResidentQueue.enqueue(pcb);
            return pcb.m_PID;
        }

        // Gets the byte from memory using address
        public GetByte(address: number): Byte
        {
            var translatedBlock: number = address / MemoryManager.MAX_MEMORY; // Which mem block
            var translatedAddress: number = address % MemoryManager.MAX_MEMORY; // Address in that block
            if (translatedAddress >= MemoryManager.MAX_MEMORY)
            {
                this.OutOfBoundsRequest(address);
            }
            else
            {
                return this.m_Memory[translatedBlock].Get(translatedAddress);
            }
        }
        
        // Set the byte @ address in memory with value in hex
        // TODO assumes P2 where we only do 256 bytes and only block 0 in memory
        public SetByte(address: number, hexValue: string): void
        {
            if (address >= 256)
            {
                this.OutOfBoundsRequest(address);
            }
            else
            {
                this.m_Memory[0].Set(address, hexValue);
                Control.MemoryTableUpdateByte(address, hexValue);
            }
        }

        // Memory was attempted to be accessed out of bounds
        private OutOfBoundsRequest(address: number): void
        {
            var params: Array<number> = new Array<number>();
            var pcb: ProcessControlBlock = Globals.m_KernelReadyQueue.peek(0);
            params[0] = pcb[0].m_PID; // WHAT IS THIS? I dont have this issue elsewhere. Its undefined if I dont treat pcb like an array..
            params[1] = address;
            Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_MEMORY_OUT_OF_BOUNDS, params));
        }

    }
}