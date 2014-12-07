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
            Control.CPUTableUpdate(this);
        }

        // Kick process off the CPU, true if forever end the process instead of putting back on ready queue
        public ContextSwitch(terminate:boolean): void
        {
            if (this.m_IsExecuting)
            {
                if (terminate)
                {
                    this.EndProgram(); // Don't put program back on the ready queue
                }
                else // Cycle the current process from the front to the back
                {
                    var pcb: ProcessControlBlock = Globals.m_KernelReadyQueue.dequeue();
                    pcb.m_Accumulator = this.m_Accumulator;
                    pcb.m_Counter = this.m_ProgramCounter;
                    pcb.m_X = this.m_X;
                    pcb.m_Y = this.m_Y;
                    pcb.m_Z = this.m_Z;
                    pcb.m_State = ProcessControlBlock.STATE_READY;
                    Globals.m_KernelReadyQueue.enqueue(pcb);
                    this.RunProgram();
                }
            }
        }

        // Resets the CPU and sets IsExecuting, triggered by Interupt
        public RunProgram(): void
        {
            this.Init();
            Control.MemoryTableColorOpCode(this.m_ProgramCounter);
            var pcb: ProcessControlBlock = Globals.m_KernelReadyQueue.peek(0);
            this.m_Accumulator = pcb.m_Accumulator;
            this.m_ProgramCounter = pcb.m_Counter;
            this.m_X = pcb.m_X;
            this.m_Y = pcb.m_Y;
            this.m_Z = pcb.m_Z;
            pcb.m_State = ProcessControlBlock.STATE_RUNNING;
            Globals.m_CurrentPCBExe = pcb;
            this.m_IsExecuting = true; // Next cycle, the program will begin to run.
            Control.CPUTableUpdate(this);
        }

        // Stops executing program, does NOT put it back on the ready queue
        public EndProgram(): void
        {
            this.m_IsExecuting = false;
            var indexToRemove: number = 0;

            Globals.m_CPUScheduler.CheckRollOut(false); // Check to make sure rollout isn't needed

            // Dequeue the process that is currently RUNNING, don't just dequeue from the start.
            // Necessary for priority scheduling which is sorted, new pid could be at the front. Nonpreemptive
            var qSize: number = Globals.m_KernelReadyQueue.getSize();
            for (var i: number = 0; i < qSize; ++i)
            {
                if (Globals.m_CurrentPCBExe.m_PID == Globals.m_KernelReadyQueue.peek(i).m_PID)
                {
                    indexToRemove = i;
                    break;
                }
            }
            var pcb: ProcessControlBlock = Globals.m_KernelReadyQueue.q.splice(indexToRemove,1)[0];
            pcb.m_Accumulator = this.m_Accumulator;
            pcb.m_Counter = this.m_ProgramCounter;
            pcb.m_X = this.m_X;
            pcb.m_Y = this.m_Y;
            pcb.m_Z = this.m_Z;
            pcb.m_State = ProcessControlBlock.STATE_TERMINATED;

            // Don't reset memory if rollout occured!!
            if (!Globals.m_CPUScheduler.RolloutOccured(pcb))
            {
                Globals.m_MemoryManager.UnlockMemory(pcb.m_MemBase);
            }
            Globals.m_AchievementSystem.Unlock(16);
            Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_CPU_BRK, null));
        }

        public Cycle(): void 
        {
            if (!Globals.m_StepMode) // Not stepping, just perform normal
            {
                Globals.m_CPUScheduler.OnCPUCycle();
                Globals.m_Kernel.Trace('CPU cycle');
                this.Execute(Globals.m_MemoryManager.GetByte(this.m_ProgramCounter));
                Control.CPUTableUpdate(this);
                Control.MemoryTableColorOpCode(this.m_ProgramCounter);
            }
            else // We are in step mode, only continue if we click next.
            {
                if (Globals.m_StepNext)
                {
                    Globals.m_CPUScheduler.OnCPUCycle();
                    Globals.m_Kernel.Trace('CPU cycle');
                    this.Execute(Globals.m_MemoryManager.GetByte(this.m_ProgramCounter));
                    Control.CPUTableUpdate(this);
                    Control.MemoryTableColorOpCode(this.m_ProgramCounter);
                    Globals.m_StepNext = false;
                }
            }
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
                    this.Break(); return; break;
                case Instructions.Op_EC:
                    this.Compare(); break;
                case Instructions.Op_D0:
                    this.Branch(); break;
                case Instructions.Op_EE:
                    this.Increment(); break;
                case Instructions.Op_FF:
                    this.SysCallRequest(); break;
                default:
                    // TODO interupt?
                    var params: Array<any> = new Array<any>();
                    var pcb: ProcessControlBlock = Globals.m_KernelReadyQueue.peek(0);
                    params[0] = pcb.m_PID; // WHAT IS THIS? I dont have this issue elsewhere. Its undefined if I dont treat pcb like an array..
                    params[1] = op;
                    Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_INVALID_OP,params));
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
            this.EndProgram();
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
                var jumpCheck = this.m_ProgramCounter + Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetDecimal();
                if (jumpCheck > 255) // We need to loop around if we go out of bounds
                {
                    this.m_ProgramCounter = jumpCheck - 256;
                }
                else
                {
                    this.m_ProgramCounter = jumpCheck;
                }
            }
        }

        // EE = INC
        // Increment the value of a byte
        private Increment(): void
        {
            var address : number = this.LittleEndianConversion()
            var valueToInc: number = Globals.m_MemoryManager.GetByte(address).GetDecimal();
            ++valueToInc;
            Globals.m_MemoryManager.SetByte(address, valueToInc.toString(16));
        }

        // FF = SYS
        // System call interupt by checking x register
        private SysCallRequest(): void
        {
            var params: Array<string> = new Array<string>(); // Sending only 1 string, but to keep interupts formatted, we pass "params"
            var message: string = "";

            if (this.m_X == 1) // print integer in Y
            {
                message = this.m_Y.toString();
            }
            else if (this.m_X == 2) // print 00-terminated string in Y
            {
                var address: number = this.m_Y;
                var value: number = Globals.m_MemoryManager.GetByte(this.m_Y).GetDecimal();
                while (value != 0)
                {
                    message += String.fromCharCode(value);
                    ++address;
                    value = Globals.m_MemoryManager.GetByte(address).GetDecimal();
                }
            }
            params[0] = message;
            Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_REQUEST_SYS_CALL, params));
        }
    }
}
