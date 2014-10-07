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
        function Cpu(m_ProgramCounter, m_Accumulator, m_XReg, m_YReg, m_ZFlag, m_IsExecuting) {
            if (typeof m_ProgramCounter === "undefined") { m_ProgramCounter = 0; }
            if (typeof m_Accumulator === "undefined") { m_Accumulator = 0; }
            if (typeof m_XReg === "undefined") { m_XReg = 0; }
            if (typeof m_YReg === "undefined") { m_YReg = 0; }
            if (typeof m_ZFlag === "undefined") { m_ZFlag = 0; }
            if (typeof m_IsExecuting === "undefined") { m_IsExecuting = false; }
            this.m_ProgramCounter = m_ProgramCounter;
            this.m_Accumulator = m_Accumulator;
            this.m_XReg = m_XReg;
            this.m_YReg = m_YReg;
            this.m_ZFlag = m_ZFlag;
            this.m_IsExecuting = m_IsExecuting;
        }
        Cpu.prototype.Init = function () {
            this.m_ProgramCounter = 0;
            this.m_Accumulator = 0;
            this.m_XReg = 0;
            this.m_YReg = 0;
            this.m_ZFlag = 0;
            this.m_IsExecuting = false;
        };

        Cpu.prototype.Cycle = function () {
            CTOS.Globals.m_Kernel.Trace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
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
                    this.SysCall();
                    break;
                default:
                    // TODO interupt?
                    CTOS.Globals.m_Console.PutText("Invalid Op: : " + op.toString());
                    break;
            }

            ++this.m_ProgramCounter;
        };

        // Op codes call for little endian, swap their order and return the decimal address
        Cpu.prototype.LittleEndianConversion = function () {
            ++this.m_ProgramCounter;
            var sigByte = CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetRawHex();
            ++this.m_ProgramCounter;
            var insigByte = CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetRawHex();

            // Swap the bytes to get the proper address
            var addressByte = new CTOS.Byte(insigByte + sigByte);
            return addressByte.GetDecimal();
        };

        // A9 = LDA
        // Load accumulator with constant
        Cpu.prototype.LoadAccConstant = function () {
            ++this.m_ProgramCounter;
            this.m_Accumulator = CTOS.Globals.m_MemoryManager.GetByte(this.m_ProgramCounter).GetHex();
        };

        // AD = LDA
        // Load accumulator from memory
        Cpu.prototype.LoadAccMem = function () {
            this.m_Accumulator = CTOS.Globals.m_MemoryManager.GetByte(this.LittleEndianConversion()).GetHex();
        };

        // 8D = STA
        // Store accumulator in memory
        Cpu.prototype.StoreAcc = function () {
            // Memory Manager, store the next 2 bytes at accumulator as address
        };

        // 6D = ADC
        // Add content of address to contents of accumulator
        // Store result in accumulator
        Cpu.prototype.AddCarry = function () {
            // this.Acc = next 2 bytes + Accumulator
        };

        // A2 = LDX
        // Load X register with constant
        Cpu.prototype.LoadXConst = function () {
            // similar to LDA
        };

        // AE = LDX
        // Load the X register from memory
        Cpu.prototype.LoadXMem = function () {
            // similar to LDA
        };

        // A0 = LDY
        // Load the Y register with constant
        Cpu.prototype.LoadYConst = function () {
            // similar to LDA
        };

        // AC = LDY
        // Load the Y register from memory
        Cpu.prototype.LoadYMem = function () {
            // similar to LDA
        };

        // EA = NOP
        Cpu.prototype.NoOp = function () {
            // Do we need to do something here? Maybe? TODO
        };

        // 00 = BRK
        Cpu.prototype.Break = function () {
            // Not sure about what this does. TODO
        };

        // EC = CPX
        // compare byte in mem to X. Sets Z if equal
        Cpu.prototype.Compare = function () {
            // Check next 2 bytes, check to x, set z if equal
        };

        // D0 = BNE
        // Branch X bytes if Z = 0
        Cpu.prototype.Branch = function () {
            if (this.m_ZFlag == 0) {
                // Jump forward however many bytes
                // Probably need to make sure we don't go out of bounds
            }
        };

        // EE = INC
        // Increment the value of a byte
        Cpu.prototype.Increment = function () {
            // check next 2 bytes, find the address, increment its data
        };

        // FF = SYS
        Cpu.prototype.SysCall = function () {
            // Check x reg
            // if 01 then print integer in Y
            // if 02 then print 00-terminated string in Y
        };
        return Cpu;
    })();
    CTOS.Cpu = Cpu;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=cpu.js.map
