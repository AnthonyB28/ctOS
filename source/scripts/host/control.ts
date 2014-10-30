///<reference path="../globals.ts" />
///<reference path="../os/canvastext.ts" />

/* ------------
     Control.ts

     Requires globals.ts.

     Routines for the hardware simulation, NOT for our client OS itself.
     These are static because we are never going to instantiate them, because they represent the hardware.
     In this manner, it's A LITTLE BIT like a hypervisor, in that the Document environment inside a browser
     is the "bare metal" (so to speak) for which we write code that hosts our client OS.
     But that analogy only goes so far, and the lines are blurred, because we are using TypeScript/JavaScript
     in both the host and client environments.

     This (and other host/simulation scripts) is the only place that we should see "web" code, such as
     DOM manipulation and event handling, and so on.  (Index.html is -- obviously -- the only place for markup.)

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

//
// Control Services
//
module CTOS {

    export class Control
    {

        private static m_LastExecutedOpPos: Array<number> = new Array<number>();
        private static m_LastMemoryAddress1Pos: Array<number> = new Array<number>();
        private static m_LastMemoryAddress2Pos: Array<number> = new Array<number>();

        public static hostInit(): void 
        {
            // Get a global reference to the canvas.  TODO: Move this stuff into a Display Device Driver, maybe?
            Globals.m_Canvas = <HTMLCanvasElement>document.getElementById('display');

            // Get a global reference to the drawing context.
            Globals.m_DrawingContext = Globals.m_Canvas.getContext('2d');

            // Get the status bar
            Globals.m_Status = <HTMLLabelElement>document.getElementById('statusLabel');
            Globals.m_Time = <HTMLLabelElement>document.getElementById('timeLabel');

            // Get the program input box
            Globals.m_ProgramInput = <HTMLTextAreaElement>document.getElementById('taProgramInput');

            // Get the CPU Table
            Globals.m_CPUTable = <HTMLTableElement> document.getElementById("CPUTable");

            //Write the Memory to table
            Globals.m_MemTable = document.getElementById("MemTable");
            Control.MemoryTableCreate();

            // Enable the added-in canvas text functions (see canvastext.ts for provenance and details).
            CanvasTextFunctions.Enable(Globals.m_DrawingContext);   // Text functionality is now built in to the HTML5 canvas. But this is old-school, and fun.

            // Clear the log text box.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("taHostLog")).value="";

            // Set focus on the start button.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("btnStartOS")).focus();

            // Check for our testing and enrichment core.
            if (typeof Globals.m_Glados === "function") {
                Globals.m_GLaDOS = new Globals.m_Glados();
                Globals.m_GLaDOS.init();
            }
        }

        public static hostLog(msg: string, source: string = "?"): void 
        {
            // Note the OS CLOCK.
            var clock: number = Globals.m_OSClock;

            // Note the REAL clock in milliseconds since January 1, 1970.
            var now: number = new Date().getTime();

            // Build the log string.
            var str: string = "({ clock:" + clock + ", source:" + source + ", msg:" + msg + ", now:" + now  + " })"  + "\n";

            // Update the log console.
            var taLog: any = document.getElementById("taHostLog");

            var replaceIdleMsg: boolean = false;
            var lastMsg: string = taLog.value.substr(0, taLog.value.indexOf("\n"));
            if (lastMsg)
            {
                if (lastMsg.indexOf("msg:Idle") > 0)
                {
                    replaceIdleMsg = true;
                }
            }

            if (!replaceIdleMsg)
            {
                taLog.value = str + taLog.value;
            }
            else
            {  
                taLog.value = taLog.value.replace(lastMsg+"\n", str);
            }
            // Optionally update a log database or some streaming service.
        }


        //
        // Host Events
        //
        public static hostBtnStartOS_click(btn): void
        {
            // Disable the (passed-in) start button...
            btn.disabled = true;

            // .. enable the Halt and Reset buttons ...
            document.getElementById("btnHaltOS").disabled = false;
            document.getElementById("btnReset").disabled = false;
            document.getElementById("btnStep").disabled = false;

            // .. set focus on the OS console display ...
            document.getElementById("display").focus();

            // ... Create and initialize the CPU & memory (because it's part of the hardware)  ...
            Globals.m_CPU = new Cpu();
            Globals.m_MemoryManager = new MemoryManager();
            Globals.m_CPUScheduler = new CPUScheduler();
            Globals.m_CPU.Init();

            // ... then set the host clock pulse ...
            Globals.m_HardwareClockID = setInterval(Devices.hostClockPulse, Globals.CPU_CLOCK_INTERVAL);
            // .. and call the OS Kernel Bootstrap routine.
            Globals.m_Kernel = new Kernel();
            Globals.m_Kernel.Bootstrap();

            // Achievement unlocked!
            Globals.m_AchievementSystem.Unlock(0);
        }

        public static hostBtnHaltOS_click(btn): void 
        {
            Control.hostLog("Emergency halt", "host");
            Control.hostLog("Attempting Kernel shutdown.", "host");
            // Call the OS shutdown routine.
            Globals.m_Kernel.Shutdown();
            // Stop the interval that's simulating our clock pulse.
            clearInterval(Globals.m_HardwareClockID);
            // TODO: Is there anything else we need to do here?
        }

        public static hostBtnReset_click(btn): void 
        {
            // The easiest and most thorough way to do this is to reload (not refresh) the document.
            location.reload(true);
            // That boolean parameter is the 'forceget' flag. When it is true it causes the page to always
            // be reloaded from the server. If it is false or not specified the browser may reload the
            // page from its cache, which is not what we want.
        }

        // Enter or exit step mode
        public static hostBtnStepActivate_click(btn): void
        {
            if (Globals.m_StepMode)
            {
                Globals.m_StepMode = false;
                Globals.m_StepNext = false;
                btn.className = "btn btn-success";
                btn.innerText = "Step";
            }
            else
            {
                Globals.m_StepMode = true;
                btn.className = "btn btn-danger";
                btn.innerText = "Exit Step";
                var nextBtn = document.getElementById("btnStepNext");
                nextBtn.disabled = false;
            }
        }

        // Continue stepping
        public static hostBtnStepNext_click(btn): void
        {
            Globals.m_StepNext = true;
            Globals.m_AchievementSystem.Unlock(13);
        }

        public static hostBtnProgram1_click(btn): void
        {
            Globals.m_AchievementSystem.Unlock(17);
            CTOS.Globals.m_ProgramInput.innerText = "A9 03 8D 41 00 A9 01 8D 40 00 AC 40 00 A2 01 FF EE 40 00 AE 40 00 EC 41 00 D0 EF A9 44 8D 42 00 A9 4F 8D 43 00 A9 4E 8D 44 00 A9 45 8D 45 00 A9 00 8D 46 00 A2 02 A0 42 FF 00";
        }

        public static hostBtnProgram2_click(btn): void
        {
            Globals.m_AchievementSystem.Unlock(17);
            CTOS.Globals.m_ProgramInput.innerText = "A9 00 8D 00 00 A9 00 8D 3B 00 A9 01 8D 3B 00 A9 00 8D 3C 00 A9 02 8D 3C 00 A9 01 6D 3B 00 8D 3B 00 A9 03 6D 3C 00 8D 3C 00 AC 3B 00 A2 01 FF A0 3D A2 02 FF AC 3C 00 A2 01 FF 00 00 00 20 61 6E 64 20 00";
        }

        public static hostBtnProgram3_click(btn): void
        {
            Globals.m_AchievementSystem.Unlock(17);
            CTOS.Globals.m_ProgramInput.innerText = "A9 00 8D 00 00 A9 00 8D 4B 00 A9 00 8D 4B 00 A2 03 EC 4B 00 D0 07 A2 01 EC 00 00 D0 05 A2 00 EC 00 00 D0 26 A0 4C A2 02 FF AC 4B 00 A2 01 FF A9 01 6D 4B 00 8D 4B 00 A2 02 EC 4B 00 D0 05 A0 55 A2 02 FF A2 01 EC 00 00 D0 C5 00 00 63 6F 75 6E 74 69 6E 67 00 68 65 6C 6C 6F 20 77 6F 72 6C 64 00";
        }

        public static hostBtnProgram4_click(btn): void
        {
            Globals.m_AchievementSystem.Unlock(17);
            CTOS.Globals.m_ProgramInput.innerText = "A9 AD A2 A9 EC 10 00 8D 10 00 EE 08 00 D0 F8 00 00";
        }


        /*public static scrollConsoleDown() : void
        {
            // Auto-scroll down
            var elem = document.getElementById('divConsole');
            elem.scrollTop = elem.scrollHeight;
        }

        public static scrollConsoleTop() : void
        {
            // Auto-scroll up & reset height
            var elem = document.getElementById('divConsole');
            elem.scrollTop = 0;
        }*/

        // Adds the unlocked achievement to the side menu
        public static AchievementAddDisplay(id : number, achievement: Achievement): void
        {
            var achievementElement = document.createElement("achievement" + id.toString());
            achievementElement.innerHTML = "</br> " + achievement.m_Description + " " + achievement.m_Score.toString();
            document.getElementById("cbp-spmenu-s1").appendChild(achievementElement);
        }

        // Increases the "gamer score" in the side menu
        public static AchievementIncrementScore(score: number): void
        {
            var scoreElement = document.getElementById("achievementScore");
            scoreElement.innerText = "Achievements : " + score.toString();
        }

        // Brings up the achievement unlocked notification
        public static AchievementNotify(id: number): void
        {
            var notificationDiv = document.getElementById("achievementNotifDiv");
            var notificationElement = document.createElement("achievement" + id.toString() + "Alert");
            notificationElement.className = "flash";
            notificationElement.innerHTML = "</br> </br><div class=\"alert alert-info\" role=\"alert\">Achievement unlocked!</div>";
            notificationDiv.appendChild(notificationElement);
        }

        // Updates the CPU table with the cpu information
        public static CPUTableUpdate(cpu: Cpu): void
        {
            var dataRow: HTMLTableRowElement = <HTMLTableRowElement> Globals.m_CPUTable.rows[1];
            var dataCell: HTMLTableCellElement = <HTMLTableCellElement> dataRow.cells[0];

            dataCell.innerText = "0x" + Globals.m_MemoryManager.GetByte(cpu.m_ProgramCounter).GetHex().toLocaleUpperCase();
            if (dataCell.innerText == "0x0")
            {
                dataCell.innerText = "0x00";
            }
            dataCell = <HTMLTableCellElement> dataRow.cells[1];
            dataCell.innerText = cpu.m_ProgramCounter.toString();
            dataCell = <HTMLTableCellElement> dataRow.cells[2];
            dataCell.innerText = cpu.m_Accumulator.toString();
            dataCell = <HTMLTableCellElement> dataRow.cells[3];
            dataCell.innerText = cpu.m_X.toString();
            dataCell = <HTMLTableCellElement> dataRow.cells[4];
            dataCell.innerText = cpu.m_Y.toString();
            dataCell = <HTMLTableCellElement> dataRow.cells[5];
            dataCell.innerText = cpu.m_Z.toString();
        }

        // Creates the initial memory table display
        // Currently only ONE block of memory for P2, will have to do for P3
        public static MemoryTableCreate() : void
        {
            for (var i : number = 0; i < MemoryManager.MAX_MEMORY*MemoryManager.MAX_MEMORY_BLOCKS / 8; ++i)
            {
                var row = Globals.m_MemTable.insertRow(i);
                for (var x = 0; x < 9; ++x)
                {
                    var cell = row.insertCell(x);
                    if (x == 0)
                    {
                        var hex: string = (i * 8).toString(16).toLocaleUpperCase();
                        cell.innerHTML = "0x" + hex;
                    }
                    else
                    {
                        cell.innerHTML = "00";
                    }
                }
            }
        }

        // Translates address into column, row array
        public static MemoryTableTranslateAddress(address: number): Array<number>
        {
            var toReturn: Array<number> = new Array<number>();
            var row = address / 8;
            row = Math.floor(row);
            address %= 8;
            address += 1;
            toReturn[0] = address;
            toReturn[1] = row;
            return toReturn;
        }

        // Clears previous set memory addresses and then sets new ones. Provide null to skip.
        public static MemoryTableColorMemoryAddress(address1: number, address2:number): void
        {

            if (this.m_LastMemoryAddress1Pos.length > 0)
            {
                var cell: any = Globals.m_MemTable.rows[this.m_LastMemoryAddress1Pos[1]].cells[this.m_LastMemoryAddress1Pos[0]];
                cell.style.color = "white";
            }
            if (this.m_LastMemoryAddress2Pos.length > 0)
            {
                var cell: any = Globals.m_MemTable.rows[this.m_LastMemoryAddress2Pos[1]].cells[this.m_LastMemoryAddress2Pos[0]];
                cell.style.color = "white";
            }

            if (address1)
            {
                // Set the new memory color
                var columnRow: Array<number> = this.MemoryTableTranslateAddress(address1);
                var cell: any = Globals.m_MemTable.rows[columnRow[1]].cells[columnRow[0]];
                cell.style.color = "LightGreen";
                this.m_LastMemoryAddress1Pos = columnRow;
            }
            else
            {
                this.m_LastMemoryAddress1Pos = new Array<number>();
            }

            if (address2)
            {
                // Set the new memory color
                columnRow = this.MemoryTableTranslateAddress(address2);
                var cell: any = Globals.m_MemTable.rows[columnRow[1]].cells[columnRow[0]];
                cell.style.color = "LightGreen";
                this.m_LastMemoryAddress2Pos = columnRow;
            }
            else
            {
                this.m_LastMemoryAddress2Pos = new Array<number>();
            }
        }

        // Colors op code at adress and reset. Provide null to just clear
        public static MemoryTableColorOpCode(address: number): void
        {
            if (Globals.m_CurrentPCBExe)
            {
                address += Globals.m_CurrentPCBExe.m_MemBase;
            }
            if (this.m_LastExecutedOpPos.length > 0)
            {
                // Reset last op color
                var cell: any = Globals.m_MemTable.rows[this.m_LastExecutedOpPos[1]].cells[this.m_LastExecutedOpPos[0]];
                cell.style.color = "white";
            }

            if (address)
            {
                // Set the new op color
                var columnRow: Array<number> = this.MemoryTableTranslateAddress(address);
                var cell: any = Globals.m_MemTable.rows[columnRow[1]].cells[columnRow[0]];
                cell.style.color = "LightSkyBlue";

                // Save
                this.m_LastExecutedOpPos = columnRow;

                switch (parseInt(cell.innerText, 16))
                {
                    case Instructions.Op_A9:
                        this.MemoryTableColorMemoryAddress(address + 1, null); break;
                    case Instructions.Op_AD:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2); break;
                    case Instructions.Op_8D:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2); break;
                    case Instructions.Op_6D:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2); break;
                    case Instructions.Op_A2:
                        this.MemoryTableColorMemoryAddress(address + 1, null); break;
                    case Instructions.Op_AE:
                        this.MemoryTableColorMemoryAddress(address + 1, null); break;
                    case Instructions.Op_A0:
                        this.MemoryTableColorMemoryAddress(address + 1, null); break;
                    case Instructions.Op_AC:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2); break;
                    case Instructions.Op_EA:
                        this.MemoryTableColorMemoryAddress(null, null); break;
                    case Instructions.Op_00:
                        this.MemoryTableColorMemoryAddress(null, null); break;
                    case Instructions.Op_EC:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2); break;
                    case Instructions.Op_D0:
                        this.MemoryTableColorMemoryAddress(address + 1, null); break;
                    case Instructions.Op_EE:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2); break;
                    case Instructions.Op_FF:
                        this.MemoryTableColorMemoryAddress(null, null); break;
                }
            }
            else
            {
                this.m_LastExecutedOpPos = new Array<number>();
            }
        }

        // Updates a single byte in memory
        // Currently only the first block in memory, might have to change for P3
        public static MemoryTableUpdateByte(address: number, hexValue: string) : void
        {
            var columnRow: Array<number> = this.MemoryTableTranslateAddress(address);
            if (hexValue == "0")
            {
                hexValue = "00";
            }
            Globals.m_MemTable.rows[columnRow[1]].cells[columnRow[0]].innerHTML = hexValue.toLocaleUpperCase();
        }

        // Resets the a whole block of memory specificed to 0 in the display
        public static MemoryTableResetBlock(block: number)
        {
            var base: number = block * MemoryManager.MAX_MEMORY / 8;
            var limit: number = base + MemoryManager.MAX_MEMORY / 8;
            for (var i: number = base; i < limit; ++i)
            {
                for (var x: number = 1; x < 9; ++x)
                {
                    Globals.m_MemTable.rows[i].cells[x].innerHTML = "00";
                }
            }
            this.MemoryTableColorMemoryAddress(null, null);
        }
    }
}
