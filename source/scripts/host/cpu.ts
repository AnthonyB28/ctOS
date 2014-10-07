///<reference path="../globals.ts" />

/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module CTOS {

    export class Cpu {

        constructor(public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

        }

        public Init(): void {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        }

        public Cycle(): void {
            Globals.m_Kernel.Trace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
        }

        public Execute(op: Byte): void
        {
            var opDecimal: number = op.GetDecimal();
            switch (opDecimal)
            {
                case Instructions.Op_A9:
                    this.LoadAccConstant(); break;
                case Instructions.Op_AD:
                    this.LoadAccMem(); break;
                case Instructions.Op_6D:
                    this.AddCarry(); break;
                case Instructions.Op_A2:
                    this.LoadXConst(); break;
                case Instructions.Op_AE:
                    this.LoadXMem(); break;
                case Instructions.Op_A0:
                    this.LoadYConst(); break;
                case Instructions.Op_AC:
                    this.LoadYMem(); break;
                case Instructions.Op_EA:
                    this.NoOp(); break;
                case Instructions.Op_00:
                    this.Break(); break;
                case Instructions.Op_EC:
                    this.Compare(); break;
                case Instructions.Op_D0:
                    this.Branch(); break;
                case Instructions.Op_EE:
                    this.Increment(); break;
                case Instructions.Op_FF:
                    this.SysCall(); break;
                default:
                    // TODO interupt?
                    Globals.m_Console.PutText("Invalid Op: : " + op.toString());
                    break;
            }
        }

        // A9 = LDA
        // Load accumulator with constant
        private LoadAccConstant(): void
        {
            //this.Acc = get next adress
        }

        // AD = LDA
        // Load accumulator from memory
        private LoadAccMem(): void
        {
            //this.Acc = next 2 bytes which is mem address
        }

        // 8D = STA
        // Store accumulator in memory
        private StoreAcc(): void
        {
            // Memory Manager, store the next 2 bytes at accumulator as address
        }

        // 6D = ADC
        // Add content of address to contents of accumulator
        // Store result in accumulator
        private AddCarry(): void
        {
            // this.Acc = next 2 bytes + Accumulator
        }

        // A2 = LDX
        // Load X register with constant
        private LoadXConst(): void
        {
            // similar to LDA
        }

        // AE = LDX
        // Load the X register from memory
        private LoadXMem(): void
        {
            // similar to LDA
        }

        // A0 = LDY
        // Load the Y register with constant
        private LoadYConst(): void
        {
            // similar to LDA
        }

        // AC = LDY
        // Load the Y register from memory
        private LoadYMem(): void
        {
            // similar to LDA
        }

        // EA = NOP
        private NoOp(): void
        {
            // Do we need to do something here? Maybe? TODO
        }

        // 00 = BRK
        private Break(): void
        {
            // Not sure about what this does. TODO
        }

        // EC = CPX
        // compare byte in mem to X. Sets Z if equal
        private Compare(): void
        {
            // Check next 2 bytes, check to x, set z if equal
        }

        // D0 = BNE
        // Branch X bytes if Z = 0
        private Branch(): void
        {
            if (this.Zflag == 0)
            {
                // Jump forward however many bytes
                // Probably need to make sure we don't go out of bounds
            }
        }

        // EE = INC
        // Increment the value of a byte
        private Increment(): void
        {
            // check next 2 bytes, find the address, increment its data
        }

        // FF = SYS
        private SysCall(): void
        {
            // Check x reg
            // if 01 then print integer in Y
            // if 02 then print 00-terminated string in Y
        }
    }
}
