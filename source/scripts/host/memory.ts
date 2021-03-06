﻿/* ------------
    Memory
   
    Representation of memory hardware such as cache/RAM.
    Limit = base + size, which is 0-255 in our case
    ------------ */   

module CTOS
{
    export class Memory
    {
        private m_Memory: Array<Byte>;

        constructor()
        {
            this.m_Memory = new Array<Byte>();
            this.Reset();
        }

        // Sets Byte in a particular address in this block of memory
        public Set(address: number, hexValue: string): void
        {
             this.m_Memory[address] = new Byte(hexValue);
        }

        // Get Byte from a particular address in this block of memory
        public Get(address: number): Byte
        {
            return this.m_Memory[address];
        }

        // Reset memory block to 0s
        public Reset()
        {
            for (var i: number = 0; i < 256; ++i)
            {
                this.m_Memory[i] = new Byte("0");
            }
        }
    }
}