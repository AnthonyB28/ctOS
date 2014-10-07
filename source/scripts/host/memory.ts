﻿/* ------------
    Memory
   
    Representation of memory hardware such as cache/RAM.
    ------------ */   

module CTOS
{
    export class Memory
    {
        private m_Memory: Array<Byte>;

        constructor()
        {
        }

        // Sets Byte in a particular address in this block of memory
        public set(address: number, hexValue: string): void
        {
            if (address > this.m_Memory.length)
            {
                CTOS.Globals.m_Console.PutText("Accessing memory out of bounds");
                //Need to do something with this properly.
            }
            else
            {
                this.m_Memory[address] = new Byte(hexValue);
            }
        }

        // Get Byte from a particular address in this block of memory
        public get(address: number): Byte
        {
            if (address > this.m_Memory.length)
            {
                CTOS.Globals.m_Console.PutText("Accessing memory out of bounds");
                //Need to do something with this properly.
                return 0;
            }
            else
            {
                return this.m_Memory[address];
            }
        }
    }
}