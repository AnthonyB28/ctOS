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

        constructor(public m_ProgramCounter: number = 0,
                    public m_Accumulator: number = 0,
                    public m_X: number = 0,
                    public m_Y: number = 0,
                    public m_Z: number = 0,
                    public m_IsExecuting: boolean = false) {

        }

        public Init(): void {
            this.m_ProgramCounter = 0;
            this.m_Accumulator = 0;
            this.m_X = 0;
            this.m_Y = 0;
            this.m_Z = 0; // 0 or 1, treat like a bool
            this.m_IsExecuting = false;
        }

        // Resets the CPU and sets IsExecuting, triggered by Interupt
        public RunProgram(): void
        {
            this.Init();
            this.m_IsExecuting = true; // Next cycle, the program will begin to run.
        }

        public Cycle(): void {
            Globals.m_Kernel.Trace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            this.Execute(Globals.m_MemoryManager.GetByte(this.m_ProgramCounter));
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
                case Instructions.Op_8D:
                    this.StoreAcc(); break;
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

            ++this.m_ProgramCounter;
        }

        // Op codes call for little endian, swap their order and return the decimal address
        private LittleEndianConversion(): number
        {
            ++this.m_ProgramCounter;
            var sigByte: string = Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetHex();
            ++this.m_ProgramCounter;
            var insigByte: string = Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetHex();

            // Swap the bytes to get the proper address
            var addressByte: Byte = new Byte(insigByte + sigByte);
            return addressByte.GetDecimal();
        }

        // A9 = LDA
        // Load accumulator with constant
        private LoadAccConstant(): void
        {
            ++this.m_ProgramCounter;
            this.m_Accumulator = Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetDecimal();
        }

        // AD = LDA
        // Load accumulator from memory
        private LoadAccMem(): void
        {
            this.m_Accumulator = Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
        }

        // 8D = STA
        // Store accumulator in memory
        private StoreAcc(): void
        {
            Globals.m_MemoryManager.SetByte(this.LittleEndianConversion(), this.m_Accumulator.toString(16));
        }

        // 6D = ADC
        // Add content of address to contents of accumulator
        // Store result in accumulator
        private AddCarry(): void
        {
            this.m_Accumulator += Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
        }

        // A2 = LDX
        // Load X register with constant
        private LoadXConst(): void
        {
            ++this.m_ProgramCounter;
            this.m_X = Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetDecimal();
        }

        // AE = LDX
        // Load the X register from memory
        private LoadXMem(): void
        {
            this.m_X = Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
        }

        // A0 = LDY
        // Load the Y register with constant
        private LoadYConst(): void
        {
            ++this.m_ProgramCounter;
            this.m_Y = Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetDecimal();
        }

        // AC = LDY
        // Load the Y register from memory
        private LoadYMem(): void
        {
            this.m_Y = Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
        }

        // EA = NOP
        private NoOp(): void
        {
            // Do we need to do something here? Maybe? TODO
        }

        // 00 = BRK
        private Break(): void
        {
            this.m_IsExecuting = false;
            var pcb: ProcessControlBlock = Globals.m_KernelReadyQueue.dequeue();
            pcb.m_Accumulator = this.m_Accumulator;
            pcb.m_Counter = this.m_ProgramCounter;
            pcb.m_X = this.m_X;
            pcb.m_Y = this.m_Y;
            pcb.m_Z = this.m_Z;
            pcb.m_State = 4; // Terminated
            // Globals.m_KernelResidentQueue.enqueue(pcb); 
            // Not sure what to do now... Need to display PCB
        }

        // EC = CPX
        // compare byte in mem to X. Sets Z if equal
        private Compare(): void
        {
            var dataToCheck : number = Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
            if (this.m_X == dataToCheck)
            {
                this.m_Z = 1;
            }
            else
            {
                this.m_Z = 0;
            }
        }

        // D0 = BNE
        // Branch X bytes if Z = 0
        private Branch(): void
        {
            ++this.m_ProgramCounter;
            if (this.m_Z == 0)
            {
                this.JumpProgramCounter(Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetDecimal());
            }
        }

        // Helper function for BNE
        // If the jump goes over the 255 boundary, we need to loop it
        private JumpProgramCounter(jumpTo: number): void
        {
            // Jump the count forward
            var jumpCheck: number = this.m_ProgramCounter + jumpTo;
            if (jumpCheck > 255)
            {
                this.JumpProgramCounter(jumpCheck);
            }
            else
            {
                this.m_ProgramCounter = jumpCheck;
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
