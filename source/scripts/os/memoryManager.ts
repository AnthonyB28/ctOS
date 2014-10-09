/* ------------
    Memory Manager
   
    Part of the OS that organizes, controls, and communicates with our memory rescources.
    Each block of memory is 256
    ------------ */   

module CTOS
{
    export class MemoryManager
    {
        private m_Memory: Array<Memory>; // Representation of memory in our machine.
        private m_MemInUse: Array<boolean>; // List of blocks in use.

        constructor()
        {
            this.m_Memory = new Array<Memory>();
            this.m_Memory[0] = new Memory(); // for now we shall only have 1 set of 256 bytes of memory
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
            pcb.m_MemBase = memoryBlockLocation * 256;
            pcb.m_MemLimit = memoryBlockLocation * 255 + 255; // TODO: concern for P3

            // Reset memory block & update display
            this.m_Memory[memoryBlockLocation].Reset();
            Control.MemoryTableResetBlock(memoryBlockLocation);

            // Load our program into the block of memory
            for (var i: number = pcb.m_MemBase; i < pcb.m_MemBase + program.length; ++i)
            {
                var address: number = i % 256;
                this.m_Memory[memoryBlockLocation].Set(address, program[address]);
                Control.MemoryTableUpdateByte(address, program[address]);
            }
            
            this.m_MemInUse[memoryBlockLocation] = true;
            Globals.m_KernelResidentQueue.enqueue(pcb);
            return pcb.m_PID;
        }

        // Gets the byte from memory using address
        // TODO assumes P2 where we only do 256 bytes and only sector 0 in memory
        public GetByte(address: number): Byte
        {
            if (address >= 256)
            {
                this.OutOfBoundsRequest(address);
            }
            else
            {
                return this.m_Memory[0].Get(address);
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
            var pcb: ProcessControlBlock = Globals.m_KernelReadyQueue.q[0];
            params[0] = pcb[0].m_PID; // WHAT IS THIS? I dont have this issue elsewhere. Its undefined if I dont treat pcb like an array..
            params[1] = address;
            Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_MEMORY_OUT_OF_BOUNDS, params));
        }

    }
}