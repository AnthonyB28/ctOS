/* ------------
    Memory Manager
   
    Part of the OS that organizes, controls, and communicates with our memory rescources.
    Each block of memory is 768 bytes.
    ------------ */   

module CTOS
{
    export class MemoryManager
    {
        private m_Memory: Array<Memory>; // Representation of memory in our machine.
        private m_MemInUse: Array<boolean>; // List of addresses in use.

        constructor()
        {
            this.m_Memory[0] = new Memory(); // for now we shall only have 1 set of 768 bytes of memory
        }


        // Gets the first available memory block not in use
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

        // Loads the program into memory.
        public LoadProgram(program: number): void
        {
            var memBlock: Memory = new Memory();
            // Create a new PCB, give it a PID, set the base & limit of the program memory
            var memoryBlockLocation: number = this.GetAvailableMemoryLocation();
            this.m_MemInUse[memoryBlockLocation] = true;
            this.m_Memory[memoryBlockLocation] = memBlock;
        }


    }
}