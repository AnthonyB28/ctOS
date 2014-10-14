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
var CTOS;
(function (CTOS) {
    var Control = (function () {
        function Control() {
        }
        Control.hostInit = function () {
            // Get a global reference to the canvas.  TODO: Move this stuff into a Display Device Driver, maybe?
            CTOS.Globals.m_Canvas = document.getElementById('display');

            // Get a global reference to the drawing context.
            CTOS.Globals.m_DrawingContext = CTOS.Globals.m_Canvas.getContext('2d');

            // Get the status bar
            CTOS.Globals.m_Status = document.getElementById('statusLabel');
            CTOS.Globals.m_Time = document.getElementById('timeLabel');

            // Get the program input box
            CTOS.Globals.m_ProgramInput = document.getElementById('taProgramInput');

            // Get the CPU Table
            CTOS.Globals.m_CPUTable = document.getElementById("CPUTable");

            //Write the Memory to table
            CTOS.Globals.m_MemTable = document.getElementById("MemTable");
            Control.MemoryTableCreate();

            // Enable the added-in canvas text functions (see canvastext.ts for provenance and details).
            CTOS.CanvasTextFunctions.Enable(CTOS.Globals.m_DrawingContext); // Text functionality is now built in to the HTML5 canvas. But this is old-school, and fun.

            // Clear the log text box.
            // Use the TypeScript cast to HTMLInputElement
            document.getElementById("taHostLog").value = "";

            // Set focus on the start button.
            // Use the TypeScript cast to HTMLInputElement
            document.getElementById("btnStartOS").focus();

            // Check for our testing and enrichment core.
            if (typeof CTOS.Globals.m_Glados === "function") {
                CTOS.Globals.m_GLaDOS = new CTOS.Globals.m_Glados();
                CTOS.Globals.m_GLaDOS.init();
            }
        };

        Control.hostLog = function (msg, source) {
            if (typeof source === "undefined") { source = "?"; }
            // Note the OS CLOCK.
            var clock = CTOS.Globals.m_OSClock;

            // Note the REAL clock in milliseconds since January 1, 1970.
            var now = new Date().getTime();

            // Build the log string.
            var str = "({ clock:" + clock + ", source:" + source + ", msg:" + msg + ", now:" + now + " })" + "\n";

            // Update the log console.
            var taLog = document.getElementById("taHostLog");

            var replaceIdleMsg = false;
            var lastMsg = taLog.value.substr(0, taLog.value.indexOf("\n"));
            if (lastMsg) {
                if (lastMsg.indexOf("msg:Idle") > 0) {
                    replaceIdleMsg = true;
                }
            }

            if (!replaceIdleMsg) {
                taLog.value = str + taLog.value;
            } else {
                taLog.value = taLog.value.replace(lastMsg + "\n", str);
            }
            // Optionally update a log database or some streaming service.
        };

        //
        // Host Events
        //
        Control.hostBtnStartOS_click = function (btn) {
            // Disable the (passed-in) start button...
            btn.disabled = true;

            // .. enable the Halt and Reset buttons ...
            document.getElementById("btnHaltOS").disabled = false;
            document.getElementById("btnReset").disabled = false;
            document.getElementById("btnStep").disabled = false;

            // .. set focus on the OS console display ...
            document.getElementById("display").focus();

            // ... Create and initialize the CPU & memory (because it's part of the hardware)  ...
            CTOS.Globals.m_CPU = new CTOS.Cpu();
            CTOS.Globals.m_MemoryManager = new CTOS.MemoryManager();
            CTOS.Globals.m_CPU.Init();

            // ... then set the host clock pulse ...
            CTOS.Globals.m_HardwareClockID = setInterval(CTOS.Devices.hostClockPulse, CTOS.Globals.CPU_CLOCK_INTERVAL);

            // .. and call the OS Kernel Bootstrap routine.
            CTOS.Globals.m_Kernel = new CTOS.Kernel();
            CTOS.Globals.m_Kernel.Bootstrap();

            // Achievement unlocked!
            CTOS.Globals.m_AchievementSystem.Unlock(0);
        };

        Control.hostBtnHaltOS_click = function (btn) {
            Control.hostLog("Emergency halt", "host");
            Control.hostLog("Attempting Kernel shutdown.", "host");

            // Call the OS shutdown routine.
            CTOS.Globals.m_Kernel.Shutdown();

            // Stop the interval that's simulating our clock pulse.
            clearInterval(CTOS.Globals.m_HardwareClockID);
            // TODO: Is there anything else we need to do here?
        };

        Control.hostBtnReset_click = function (btn) {
            // The easiest and most thorough way to do this is to reload (not refresh) the document.
            location.reload(true);
            // That boolean parameter is the 'forceget' flag. When it is true it causes the page to always
            // be reloaded from the server. If it is false or not specified the browser may reload the
            // page from its cache, which is not what we want.
        };

        // Enter or exit step mode
        Control.hostBtnStepActivate_click = function (btn) {
            if (CTOS.Globals.m_StepMode) {
                CTOS.Globals.m_StepMode = false;
                CTOS.Globals.m_StepNext = false;
                btn.className = "btn btn-success";
                btn.innerText = "Step";
            } else {
                CTOS.Globals.m_StepMode = true;
                btn.className = "btn btn-danger";
                btn.innerText = "Exit Step";
                var nextBtn = document.getElementById("btnStepNext");
                nextBtn.disabled = false;
            }
        };

        // Continue stepping
        Control.hostBtnStepNext_click = function (btn) {
            CTOS.Globals.m_StepNext = true;
        };

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
        Control.AchievementAddDisplay = function (id, achievement) {
            var achievementElement = document.createElement("achievement" + id.toString());
            achievementElement.innerHTML = "</br> " + achievement.m_Description + " " + achievement.m_Score.toString();
            document.getElementById("cbp-spmenu-s1").appendChild(achievementElement);
        };

        // Increases the "gamer score" in the side menu
        Control.AchievementIncrementScore = function (score) {
            var scoreElement = document.getElementById("achievementScore");
            scoreElement.innerText = "Achievements : " + score.toString();
        };

        // Brings up the achievement unlocked notification
        Control.AchievementNotify = function (id) {
            var notificationDiv = document.getElementById("achievementNotifDiv");
            var notificationElement = document.createElement("achievement" + id.toString() + "Alert");
            notificationElement.className = "flash";
            notificationElement.innerHTML = "</br> </br><div class=\"alert alert-info\" role=\"alert\">Achievement unlocked!</div>";
            notificationDiv.appendChild(notificationElement);
        };

        // Updates the CPU table with the cpu information
        Control.CPUTableUpdate = function (cpu) {
            var dataRow = CTOS.Globals.m_CPUTable.rows[1];
            var dataCell = dataRow.cells[0];

            dataCell.innerText = "0x" + CTOS.Globals.m_MemoryManager.GetByte(cpu.m_ProgramCounter).GetHex().toLocaleUpperCase();
            dataCell = dataRow.cells[1];
            dataCell.innerText = cpu.m_ProgramCounter.toString();
            dataCell = dataRow.cells[2];
            dataCell.innerText = cpu.m_Accumulator.toString();
            dataCell = dataRow.cells[3];
            dataCell.innerText = cpu.m_X.toString();
            dataCell = dataRow.cells[4];
            dataCell.innerText = cpu.m_Y.toString();
            dataCell = dataRow.cells[5];
            dataCell.innerText = cpu.m_Z.toString();
        };

        // Creates the initial memory table display
        // Currently only ONE block of memory for P2, will have to do for P3
        Control.MemoryTableCreate = function () {
            for (var i = 0; i < 256 / 8; ++i) {
                var row = CTOS.Globals.m_MemTable.insertRow(i);
                for (var x = 0; x < 9; ++x) {
                    var cell = row.insertCell(x);
                    if (x == 0) {
                        cell.innerHTML = "0x" + (i * 8).toString(16).toLocaleUpperCase();
                    } else {
                        cell.innerHTML = "00";
                    }
                }
            }
        };

        // Translates address into column, row array
        Control.MemoryTableTranslateAddress = function (address) {
            var toReturn = new Array();
            var row = address / 8;
            row = Math.floor(row);
            address %= 8;
            address += 1;
            toReturn[0] = address;
            toReturn[1] = row;
            return toReturn;
        };

        // Clears previous set memory addresses and then sets new ones. Provide null to skip.
        Control.MemoryTableColorMemoryAddress = function (address1, address2) {
            if (this.m_LastMemoryAddress1Pos.length > 0) {
                var cell = CTOS.Globals.m_MemTable.rows[this.m_LastMemoryAddress1Pos[1]].cells[this.m_LastMemoryAddress1Pos[0]];
                cell.style.color = "white";
            }
            if (this.m_LastMemoryAddress2Pos.length > 0) {
                var cell = CTOS.Globals.m_MemTable.rows[this.m_LastMemoryAddress2Pos[1]].cells[this.m_LastMemoryAddress2Pos[0]];
                cell.style.color = "white";
            }

            if (address1) {
                // Set the new memory color
                var columnRow = this.MemoryTableTranslateAddress(address1);
                var cell = CTOS.Globals.m_MemTable.rows[columnRow[1]].cells[columnRow[0]];
                cell.style.color = "LightGreen";
                this.m_LastMemoryAddress1Pos = columnRow;
            } else {
                this.m_LastMemoryAddress1Pos = new Array();
            }

            if (address2) {
                // Set the new memory color
                columnRow = this.MemoryTableTranslateAddress(address2);
                var cell = CTOS.Globals.m_MemTable.rows[columnRow[1]].cells[columnRow[0]];
                cell.style.color = "LightGreen";
                this.m_LastMemoryAddress2Pos = columnRow;
            } else {
                this.m_LastMemoryAddress2Pos = new Array();
            }
        };

        // Colors op code at adress and reset. Provide null to just clear
        Control.MemoryTableColorOpCode = function (address) {
            if (this.m_LastExecutedOpPos.length > 0) {
                // Reset last op color
                var cell = CTOS.Globals.m_MemTable.rows[this.m_LastExecutedOpPos[1]].cells[this.m_LastExecutedOpPos[0]];
                cell.style.color = "white";
            }

            if (address) {
                // Set the new op color
                var columnRow = this.MemoryTableTranslateAddress(address);
                var cell = CTOS.Globals.m_MemTable.rows[columnRow[1]].cells[columnRow[0]];
                cell.style.color = "LightSkyBlue";

                // Save
                this.m_LastExecutedOpPos = columnRow;

                switch (parseInt(cell.innerText, 16)) {
                    case CTOS.Instructions.Op_A9:
                        this.MemoryTableColorMemoryAddress(address + 1, null);
                        break;
                    case CTOS.Instructions.Op_AD:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2);
                        break;
                    case CTOS.Instructions.Op_8D:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2);
                        break;
                    case CTOS.Instructions.Op_6D:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2);
                        break;
                    case CTOS.Instructions.Op_A2:
                        this.MemoryTableColorMemoryAddress(address + 1, null);
                        break;
                    case CTOS.Instructions.Op_AE:
                        this.MemoryTableColorMemoryAddress(address + 1, null);
                        break;
                    case CTOS.Instructions.Op_A0:
                        this.MemoryTableColorMemoryAddress(address + 1, null);
                        break;
                    case CTOS.Instructions.Op_AC:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2);
                        break;
                    case CTOS.Instructions.Op_EA:
                        this.MemoryTableColorMemoryAddress(null, null);
                        break;
                    case CTOS.Instructions.Op_00:
                        this.MemoryTableColorMemoryAddress(null, null);
                        break;
                    case CTOS.Instructions.Op_EC:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2);
                        break;
                    case CTOS.Instructions.Op_D0:
                        this.MemoryTableColorMemoryAddress(address + 1, null);
                        break;
                    case CTOS.Instructions.Op_EE:
                        this.MemoryTableColorMemoryAddress(address + 1, address + 2);
                        break;
                    case CTOS.Instructions.Op_FF:
                        this.MemoryTableColorMemoryAddress(null, null);
                        break;
                }
            } else {
                this.m_LastExecutedOpPos = new Array();
            }
        };

        // Updates a single byte in memory
        // Currently only the first block in memory, might have to change for P3
        Control.MemoryTableUpdateByte = function (address, hexValue) {
            var columnRow = this.MemoryTableTranslateAddress(address);
            CTOS.Globals.m_MemTable.rows[columnRow[1]].cells[columnRow[0]].innerHTML = hexValue.toLocaleUpperCase();
        };

        // Resets the a whole block of memory specificed to 0 in the display
        Control.MemoryTableResetBlock = function (block) {
            var base = block * 256 / 8;
            var limit = base + 255 / 8;
            for (var i = base; i < limit; ++i) {
                for (var x = 1; x < 9; ++x) {
                    CTOS.Globals.m_MemTable.rows[i].cells[x].innerHTML = "00";
                }
            }
            this.MemoryTableColorMemoryAddress(null, null);
        };
        Control.m_LastExecutedOpPos = new Array();
        Control.m_LastMemoryAddress1Pos = new Array();
        Control.m_LastMemoryAddress2Pos = new Array();
        return Control;
    })();
    CTOS.Control = Control;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=control.js.map
