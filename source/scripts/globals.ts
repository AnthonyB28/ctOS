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
         static APP_VERSION: string = "2.0";   // What did you expect? ... Everything

         static CPU_CLOCK_INTERVAL: number = 100;   // This is in ms, or milliseconds, so 1000 = 1 second.

         static TIMER_IRQ: number = 0;  // Pages 23 (timer), 9 (interrupts), and 561 (interrupt priority).
                                    // NOTE: The timer is different from hardware/host clock pulses. Don't confuse these.
         static KEYBOARD_IRQ: number = 1;

         static MAX_COMMAND_HISTORY: number = 10; // How many commands we can keep in history. Realistically, it wouldn't be infinity.


        //
        // Global iables
        //
         static m_CPU: CTOS.Cpu;  // Utilize TypeScript's type annotation system to ensure that _CPU is an instance of the Cpu class.

         static m_OSClock: number = 0;  // Page 23.

        //oops mode
         static m_Mode: number = 0;     // (currently unused)  0 = Kernel Mode, 1 = User Mode.  See page 21.

        // Initialized in hostInit().
         static m_Canvas: HTMLCanvasElement = null; 
         static m_Status: HTMLLabelElement = null;
         static m_Time: HTMLLabelElement = null;
         static m_ProgramInput: HTMLTextAreaElement = null;
         static m_DrawingContext = null;  
           
         static m_DefaultFontFamily = "sans";        // Ignored, I think. The was just a place-holder in 2008, but the HTML canvas may have use for it.
         static m_DefaultFontSize = 13;
         static m_FontHeightMargin = 4;              // Additional space added to font size when advancing a line.

         static m_Trace: boolean = true;  // Default the OS trace to be on.

        // The OS Kernel and its queues.
         static m_Kernel: CTOS.Kernel;
         static m_KernelInterruptQueue = null;
         static m_KernelBuffers: any[] = null;
         static m_KernelInputQueue = null;

        // Standard input and output
         static m_StdIn  = null;
         static m_StdOut: CTOS.Console = null;

        // UI
         static m_Console: CTOS.Console;
         static m_OsShell: CTOS.Shell;
         static m_BSODColor: string = "#236B8E"; // Inner circle
         static m_ConsoleTextDefaultColor: string = "white";

        // At least this OS is not trying to kill you. (Yet.)
         static m_SarcasticMode: boolean = false;

        // Global Device Driver Objects - page 12
         static m_KrnKeyboardDriver = null;

         static m_HardwareClockID: number = null;

        // For testing...
         static m_GLaDOS: any = null;
         static m_Glados: any = null;

         static onDocumentLoad = function() {
	        Control.hostInit();
        };
    }
}