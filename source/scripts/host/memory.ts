﻿module CTOS
{
    export class Memory
    {
        private m_Memory: Array<number>;

        constructor()
        {
            for (var i: number = 0; i < 768; ++i)
            {
                this.m_Memory[i] = 0;
            }
        }

        public set(address: number, value: number): void
        {
            if (address > this.m_Memory.length)
            {
                CTOS.Globals.m_Console.PutText("Accessing memory out of bounds");
                //Need to do something with this properly.
            }
            else
            {
                this.m_Memory[address] = value;
            }
        }

        public get(address: number, value: number): number
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