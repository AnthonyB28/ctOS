/* ------------
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
            for(var i : number = 0; i < 256; ++i)
            {
                this.m_Memory[i] = new Byte("0");
            }
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
                return new Byte("0");
            }
            else
            {
                return this.m_Memory[address];
            }
        }
    }
}