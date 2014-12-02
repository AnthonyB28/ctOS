///<reference path="achievements.ts" />
/* ------------
   Globals.ts

   Global CONSTANTS and _iables.
   (Global over both the OS and Hardware Simulation / Host.)

   This code references page numbers in the text book:
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */

module CTOS 
{
    export class Globals 
    {
        // Global "CONSTANTS" (There is currently no const or final or readonly type annotation in TypeScript.)
        
        static APP_NAME: string    = "ctOS";   // 'cause washDogs
        static APP_VERSION: string = "2.5";   // What did you expect? ... Everything

        static CPU_CLOCK_INTERVAL: number = 100;   // This is in ms, or milliseconds, so 1000 = 1 second.
        
        static INTERRUPT_REQUEST_TIMER: number = 0;  // Pages 23 (timer), 9 (interrupts), and 561 (interrupt priority). NOTE: The timer is different from hardware/host clock pulses. Don't confuse these.
        static INTERRUPT_REQUEST_KEYBOARD: number = 1; // Keyboard input
        static INTERRUPT_REQUEST_CPU_RUN_PROGRAM: number = 2; // Request to run program on CPU
        static INTERRUPT_REQUEST_SYS_CALL: number = 3; // Syscall request to print to screen.
        static INTERRUPT_MEMORY_OUT_OF_BOUNDS: number = 4; // Program runs over block of memory.
        static INTERRUPT_INVALID_OP: number = 5; // Program had an invalid op.
        static INTERRUPT_CPU_BRK: number = 6; // Program had an invalid op.
        static INTERRUPT_CPU_CNTXSWTCH: number = 7;
        static INTERRUPT_REQUEST_HD: number = 8;
        static MAX_COMMAND_HISTORY: number = 10; // How many commands we can keep in history. Realistically, it wouldn't be infinity.

        //
        // Global variables
        //
        static m_CPU: Cpu;  // Utilize TypeScript's type annotation system to ensure that CPU is an instance of the Cpu class.
        static m_CPUScheduler: CPUScheduler; // Round Robin scheduler for CPU
        static m_MemoryManager: MemoryManager; // Interface with our memory
        static m_HardDrive: HardDrive = null;

        //oops mode
        static m_Mode: number = 0;     // (currently unused)  0 = Kernel Mode, 1 = User Mode.  See page 21.

        // Initialized in hostInit().
        static m_Canvas: HTMLCanvasElement = null; 
        static m_Status: HTMLLabelElement = null;
        static m_Time: HTMLLabelElement = null;
        static m_MemTable: any = null;
        static m_ReadyQTable: any = null;
        static m_CPUTable: HTMLTableElement = null;
        static m_ProgramInput: HTMLTextAreaElement = null;
        static m_DrawingContext = null;  
        static m_HardDriveTable = null;
       
        static m_DefaultFontFamily = "sans";        // Ignored, I think. The was just a place-holder in 2008, but the HTML canvas may have use for it.
        static m_DefaultFontSize = 13;
        static m_FontHeightMargin = 4;              // Additional space added to font size when advancing a line.

        static m_Trace: boolean = true;  // Default the OS trace to be on.

        // The OS Kernel and its queues.
        static m_Kernel: CTOS.Kernel;
        static m_KernelInterruptQueue : Queue = null;
        static m_KernelReadyQueue : Queue = null;
        static m_KernelResidentQueue: Queue = null;
        static m_KernelBuffers: any[] = null;
        static m_KernelInputQueue = null;
        static m_CurrentPCBExe: ProcessControlBlock = null;

        // Standard input and output
        static m_StdIn  = null;
        static m_StdOut: CTOS.Console = null;

        // UI
        static m_OSClock: number = 0;  // Page 23.
        static m_StepMode: boolean = false; // If step mode is activated, don't go to next execution.
        static m_StepNext: boolean = false; // If step next & mode are activated, go to next execution.
        static m_MemTableAutoScroll: boolean = true;
        static m_Console: CTOS.Console;
        static m_OsShell: CTOS.Shell;
        static m_BSODColor: string = "#236B8E"; // Inner circle
        static m_ConsoleTextDefaultColor: string = "white";

        // At least this OS is not trying to kill you. (Yet.)
        static m_AchievementSystem: AchievementSystem;
        static m_SarcasticMode: boolean = false;

        // Global Device Driver Objects - page 12
        static m_KrnKeyboardDriver : DeviceDriverKeyboard = null;
        static m_KrnHardDriveDriver : DeviceDriverHardDrive = null;
        static m_HardwareClockID: number = null;

        // For testing...
        static m_GLaDOS: any = null;
        static m_Glados: any = null;

        static onDocumentLoad = function ()
        {
            Globals.m_AchievementSystem = new AchievementSystem();
            Control.hostInit();
        };
    }
}