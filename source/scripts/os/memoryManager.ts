﻿/* ------------
    Memory Manager
   
    Part of the OS that organizes, controls, and communicates with our memory rescources.
    Each block of memory is 256
    ------------ */   

module CTOS
{
    export class MemoryManager
    {
        private m_Memory: Array<Memory>; // Representation of memory in our machine.
        private m_MemInUse: Array<boolean>; // List of addresses in use.

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

        // Loads the program into memory.
        public LoadProgram(program: Array<string>): void
        {
            var memBlock: Memory = new Memory();
            var memoryAddress: number = 0;
            for (var i: number = 0; i < program.length; ++i)
            {
                memBlock.set(i, program[i]);
            }
            // Create a new PCB, give it a PID, set the base & limit of the program memory
            var pcb: ProcessControlBlock = new ProcessControlBlock();

            var memoryBlockLocation: number = this.GetAvailableMemoryLocation();
            this.m_MemInUse[memoryBlockLocation] = true;
            this.m_Memory[memoryBlockLocation] = memBlock;
        }

        // Gets the byte from memory using address
        // TODO assumes P2 where we only do 256 bytes and only sector 0 in memory
        public GetByte(address: number): Byte
        {
            if (address >= 256)
            {
                return this.GetByte(address - 256); // loop around if we're larger than 255
            }
            else
            {
                return this.m_Memory[0].get(address);
            }
        }

    }
}