///<reference path="achievements.ts" />
/* ------------
Globals.ts
Global CONSTANTS and _iables.
(Global over both the OS and Hardware Simulation / Host.)
This code references page numbers in the text book:
Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
------------ */
var CTOS;
(function (CTOS) {
    var Globals = (function () {
        function Globals() {
        }
        Globals.APP_NAME = "ctOS";
        Globals.APP_VERSION = "2.5";

        Globals.CPU_CLOCK_INTERVAL = 100;

        Globals.INTERRUPT_REQUEST_TIMER = 0;
        Globals.INTERRUPT_REQUEST_KEYBOARD = 1;
        Globals.INTERRUPT_REQUEST_CPU_RUN_PROGRAM = 2;
        Globals.INTERRUPT_REQUEST_SYS_CALL = 3;
        Globals.INTERRUPT_MEMORY_OUT_OF_BOUNDS = 4;
        Globals.INTERRUPT_INVALID_OP = 5;
        Globals.INTERRUPT_CPU_BRK = 6;
        Globals.INTERRUPT_CPU_CNTXSWTCH = 7;
        Globals.INTERRUPT_REQUEST_HD = 8;
        Globals.MAX_COMMAND_HISTORY = 10;

        Globals.m_HardDrive = null;

        Globals.m_Mode = 0;

        Globals.m_Canvas = null;
        Globals.m_Status = null;
        Globals.m_Time = null;
        Globals.m_MemTable = null;
        Globals.m_ReadyQTable = null;
        Globals.m_CPUTable = null;
        Globals.m_ProgramInput = null;
        Globals.m_DrawingContext = null;
        Globals.m_HardDriveTable = null;

        Globals.m_DefaultFontFamily = "sans";
        Globals.m_DefaultFontSize = 13;
        Globals.m_FontHeightMargin = 4;

        Globals.m_Trace = true;

        Globals.m_KernelInterruptQueue = null;
        Globals.m_KernelReadyQueue = null;
        Globals.m_KernelResidentQueue = null;
        Globals.m_KernelBuffers = null;
        Globals.m_KernelInputQueue = null;
        Globals.m_CurrentPCBExe = null;

        Globals.m_StdIn = null;
        Globals.m_StdOut = null;

        Globals.m_OSClock = 0;
        Globals.m_StepMode = false;
        Globals.m_StepNext = false;
        Globals.m_MemTableAutoScroll = true;

        Globals.m_BSODColor = "#236B8E";
        Globals.m_ConsoleTextDefaultColor = "white";

        Globals.m_SarcasticMode = false;

        Globals.m_KrnKeyboardDriver = null;
        Globals.m_KrnHardDriveDriver = null;
        Globals.m_HardwareClockID = null;

        Globals.m_GLaDOS = null;
        Globals.m_Glados = null;

        Globals.onDocumentLoad = function () {
            Globals.m_AchievementSystem = new CTOS.AchievementSystem();
            CTOS.Control.hostInit();
        };
        return Globals;
    })();
    CTOS.Globals = Globals;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=globals.js.map
