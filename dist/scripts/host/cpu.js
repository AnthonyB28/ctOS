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
var CTOS;
(function (CTOS) {
    var Cpu = (function () {
        function Cpu(m_ProgramCounter, m_Accumulator, m_X, m_Y, m_Z, m_IsExecuting) {
            if (typeof m_ProgramCounter === "undefined") { m_ProgramCounter = 0; }
            if (typeof m_Accumulator === "undefined") { m_Accumulator = 0; }
            if (typeof m_X === "undefined") { m_X = 0; }
            if (typeof m_Y === "undefined") { m_Y = 0; }
            if (typeof m_Z === "undefined") { m_Z = 0; }
            if (typeof m_IsExecuting === "undefined") { m_IsExecuting = false; }
            this.m_ProgramCounter = m_ProgramCounter;
            this.m_Accumulator = m_Accumulator;
            this.m_X = m_X;
            this.m_Y = m_Y;
            this.m_Z = m_Z;
            this.m_IsExecuting = m_IsExecuting;
        }
        Cpu.prototype.Init = function () {
            this.m_ProgramCounter = 0;
            this.m_Accumulator = 0;
            this.m_X = 0;
            this.m_Y = 0;
            this.m_Z = 0; // 0 or 1, treat like a bool
            this.m_IsExecuting = false;
            CTOS.Control.CPUTableUpdate(this);
        };

        // Kick process off the CPU, true if forever end the process instead of putting back on ready queue
        Cpu.prototype.ContextSwitch = function (terminate) {
            if (this.m_IsExecuting) {
                if (terminate) {
                    this.EndProgram(); // Don't put program back on the ready queue
                } else {
                    var pcb = CTOS.Globals.m_KernelReadyQueue.dequeue();
                    pcb.m_Accumulator = this.m_Accumulator;
                    pcb.m_Counter = this.m_ProgramCounter;
                    pcb.m_X = this.m_X;
                    pcb.m_Y = this.m_Y;
                    pcb.m_Z = this.m_Z;
                    pcb.m_State = CTOS.ProcessControlBlock.STATE_READY;
                    CTOS.Globals.m_KernelReadyQueue.enqueue(pcb);
                    this.RunProgram();
                }
            }
        };

        // Resets the CPU and sets IsExecuting, triggered by Interupt
        Cpu.prototype.RunProgram = function () {
            this.Init();
            CTOS.Control.MemoryTableColorOpCode(this.m_ProgramCounter);
            var pcb = CTOS.Globals.m_KernelReadyQueue.peek(0);
            this.m_Accumulator = pcb.m_Accumulator;
            this.m_ProgramCounter = pcb.m_Counter;
            this.m_X = pcb.m_X;
            this.m_Y = pcb.m_Y;
            this.m_Z = pcb.m_Z;
            pcb.m_State = CTOS.ProcessControlBlock.STATE_RUNNING;
            CTOS.Globals.m_CurrentPCBExe = pcb;
            this.m_IsExecuting = true; // Next cycle, the program will begin to run.
            CTOS.Control.CPUTableUpdate(this);
        };

        // Stops executing program, does NOT put it back on the ready queue
        Cpu.prototype.EndProgram = function () {
            this.m_IsExecuting = false;
            var indexToRemove = 0;

            // Dequeue the process that is currently RUNNING, don't just dequeue from the start.
            // Necessary for priority scheduling which is sorted, new pid could be at the front. Nonpreemptive
            var qSize = CTOS.Globals.m_KernelReadyQueue.getSize();
            for (var i = 0; i < qSize; ++i) {
                if (CTOS.Globals.m_CurrentPCBExe.m_PID == CTOS.Globals.m_KernelReadyQueue.peek(i).m_PID) {
                    indexToRemove = i;
                }
            }
            var pcb = CTOS.Globals.m_KernelReadyQueue.q.splice(indexToRemove, 1)[0];
            pcb.m_Accumulator = this.m_Accumulator;
            pcb.m_Counter = this.m_ProgramCounter;
            pcb.m_X = this.m_X;
            pcb.m_Y = this.m_Y;
            pcb.m_Z = this.m_Z;
            pcb.m_State = CTOS.ProcessControlBlock.STATE_TERMINATED;
            CTOS.Globals.m_MemoryManager.UnlockMemory(pcb.m_MemBase);
            CTOS.Globals.m_AchievementSystem.Unlock(16);
            CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_CPU_BRK, null));
        };

        Cpu.prototype.Cycle = function () {
            if (!CTOS.Globals.m_StepMode) {
                CTOS.Globals.m_CPUScheduler.OnCPUCycle();
                CTOS.Globals.m_Kernel.Trace('CPU cycle');
                this.Execute(CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter));
                CTOS.Control.CPUTableUpdate(this);
                CTOS.Control.MemoryTableColorOpCode(this.m_ProgramCounter);
            } else {
                if (CTOS.Globals.m_StepNext) {
                    CTOS.Globals.m_CPUScheduler.OnCPUCycle();
                    CTOS.Globals.m_Kernel.Trace('CPU cycle');
                    this.Execute(CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter));
                    CTOS.Control.CPUTableUpdate(this);
                    CTOS.Control.MemoryTableColorOpCode(this.m_ProgramCounter);
                    CTOS.Globals.m_StepNext = false;
                }
            }
        };

        Cpu.prototype.Execute = function (op) {
            var opDecimal = op.GetDecimal();
            switch (opDecimal) {
                case CTOS.Instructions.Op_A9:
                    this.LoadAccConstant();
                    break;
                case CTOS.Instructions.Op_AD:
                    this.LoadAccMem();
                    break;
                case CTOS.Instructions.Op_8D:
                    this.StoreAcc();
                    break;
                case CTOS.Instructions.Op_6D:
                    this.AddCarry();
                    break;
                case CTOS.Instructions.Op_A2:
                    this.LoadXConst();
                    break;
                case CTOS.Instructions.Op_AE:
                    this.LoadXMem();
                    break;
                case CTOS.Instructions.Op_A0:
                    this.LoadYConst();
                    break;
                case CTOS.Instructions.Op_AC:
                    this.LoadYMem();
                    break;
                case CTOS.Instructions.Op_EA:
                    this.NoOp();
                    break;
                case CTOS.Instructions.Op_00:
                    this.Break();
                    return;
                    break;
                case CTOS.Instructions.Op_EC:
                    this.Compare();
                    break;
                case CTOS.Instructions.Op_D0:
                    this.Branch();
                    break;
                case CTOS.Instructions.Op_EE:
                    this.Increment();
                    break;
                case CTOS.Instructions.Op_FF:
                    this.SysCallRequest();
                    break;
                default:
                    // TODO interupt?
                    var params = new Array();
                    var pcb = CTOS.Globals.m_KernelReadyQueue.peek(0);
                    params[0] = pcb.m_PID; // WHAT IS THIS? I dont have this issue elsewhere. Its undefined if I dont treat pcb like an array..
                    params[1] = op;
                    CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_INVALID_OP, params));
                    break;
            }

            ++this.m_ProgramCounter;
        };

        // Op codes call for little endian, swap their order and return the decimal address
        Cpu.prototype.LittleEndianConversion = function () {
            ++this.m_ProgramCounter;
            var sigByte = CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetHex();
            ++this.m_ProgramCounter;
            var insigByte = CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetHex();

            // Swap the bytes to get the proper address
            var addressByte = new CTOS.Byte(insigByte + sigByte);
            return addressByte.GetDecimal();
        };

        // A9 = LDA
        // Load accumulator with constant
        Cpu.prototype.LoadAccConstant = function () {
            ++this.m_ProgramCounter;
            this.m_Accumulator = CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetDecimal();
        };

        // AD = LDA
        // Load accumulator from memory
        Cpu.prototype.LoadAccMem = function () {
            this.m_Accumulator = CTOS.Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
        };

        // 8D = STA
        // Store accumulator in memory
        Cpu.prototype.StoreAcc = function () {
            CTOS.Globals.m_MemoryManager.SetByte(this.LittleEndianConversion(), this.m_Accumulator.toString(16));
        };

        // 6D = ADC
        // Add content of address to contents of accumulator
        // Store result in accumulator
        Cpu.prototype.AddCarry = function () {
            this.m_Accumulator += CTOS.Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
        };

        // A2 = LDX
        // Load X register with constant
        Cpu.prototype.LoadXConst = function () {
            ++this.m_ProgramCounter;
            this.m_X = CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetDecimal();
        };

        // AE = LDX
        // Load the X register from memory
        Cpu.prototype.LoadXMem = function () {
            this.m_X = CTOS.Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
        };

        // A0 = LDY
        // Load the Y register with constant
        Cpu.prototype.LoadYConst = function () {
            ++this.m_ProgramCounter;
            this.m_Y = CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetDecimal();
        };

        // AC = LDY
        // Load the Y register from memory
        Cpu.prototype.LoadYMem = function () {
            this.m_Y = CTOS.Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
        };

        // EA = NOP
        Cpu.prototype.NoOp = function () {
            // Do we need to do something here? Maybe? TODO
        };

        // 00 = BRK
        Cpu.prototype.Break = function () {
            this.EndProgram();
        };

        // EC = CPX
        // compare byte in mem to X. Sets Z if equal
        Cpu.prototype.Compare = function () {
            var dataToCheck = CTOS.Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetDecimal();
            if (this.m_X == dataToCheck) {
                this.m_Z = 1;
            } else {
                this.m_Z = 0;
            }
        };

        // D0 = BNE
        // Branch X bytes if Z = 0
        Cpu.prototype.Branch = function () {
            ++this.m_ProgramCounter;
            if (this.m_Z == 0) {
                var jumpCheck = this.m_ProgramCounter + CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetDecimal();
                if (jumpCheck > 255) {
                    this.m_ProgramCounter = jumpCheck - 256;
                } else {
                    this.m_ProgramCounter = jumpCheck;
                }
            }
        };

        // EE = INC
        // Increment the value of a byte
        Cpu.prototype.Increment = function () {
            var address = this.LittleEndianConversion();
            var valueToInc = CTOS.Globals.m_MemoryManager.GetByte(address).GetDecimal();
            ++valueToInc;
            CTOS.Globals.m_MemoryManager.SetByte(address, valueToInc.toString(16));
        };

        // FF = SYS
        // System call interupt by checking x register
        Cpu.prototype.SysCallRequest = function () {
            var params = new Array();
            var message = "";

            if (this.m_X == 1) {
                message = this.m_Y.toString();
            } else if (this.m_X == 2) {
                var address = this.m_Y;
                var value = CTOS.Globals.m_MemoryManager.GetByte(this.m_Y).GetDecimal();
                while (value != 0) {
                    message += String.fromCharCode(value);
                    ++address;
                    value = CTOS.Globals.m_MemoryManager.GetByte(address).GetDecimal();
                }
            }
            params[0] = message;
            CTOS.Globals.m_KernelInterruptQueue.enqueue(new CTOS.Interrupt(CTOS.Globals.INTERRUPT_REQUEST_SYS_CALL, params));
        };
        return Cpu;
    })();
    CTOS.Cpu = Cpu;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=cpu.js.map
