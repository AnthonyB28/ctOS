///<reference path="shellCommand.ts" />
///<reference path="userCommand.ts" />
///<reference path="../utils.ts" />
///<reference path="../secret.ts"/>
/* ------------
Shell.ts
The OS Shell - The "command line interface" (CLI) for the console.
------------ */
// TODO: Write a base class / prototype for system services and let Shell inherit from it.
var CTOS;
(function (CTOS) {
    var Shell = (function () {
        function Shell() {
            // Properties
            this.m_PromptStr = ">";
            this.m_CommandList = [];
            this.m_Curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.m_SecretMsg = "Svir cyhf svir zvahf bar vf avar. Avar qvivqrq ol guerr vf guerr. Unys Yvsr 3 pbasvezrq.";
            this.m_Apologies = "[sorry]";
        }
        Shell.prototype.Init = function () {
            var sc = null;

            //
            // Load the command list.
            // ver
            sc = new CTOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // load
            sc = new CTOS.ShellCommand(this.shellLoad, "load", "- Loads the program from Program Input box.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // run
            sc = new CTOS.ShellCommand(this.shellRun, "run", "<PID> - Runs the program by ID that is in memory.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // help
            sc = new CTOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // shutdown
            sc = new CTOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying hardware simulation running.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // cls
            sc = new CTOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // man <topic>
            sc = new CTOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the Manual page for <topic>.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // trace <on | off>
            sc = new CTOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // rot13 <string>
            sc = new CTOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // prompt <string>
            sc = new CTOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Date
            sc = new CTOS.ShellCommand(this.shellDate, "date", "- Displays the current Date & Time.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // WhereAmI
            sc = new CTOS.ShellCommand(this.shellWhereAmI, "whereami", "- Displays the users current location. (Lie)");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Status
            sc = new CTOS.ShellCommand(this.shellStatus, "status", "<string> - Sets the status message");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Explode
            sc = new CTOS.ShellCommand(this.shellExplode, "explode!", "- BSOD & Shutdown");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // processes - list the running processes and their IDs
            // kill <id> - kills the specified process id.
            /* ---
            Silly stuff cause I can do this all day.
            --- */
            // Alan
            sc = new CTOS.ShellCommand(this.shellAlan, "alan!", "- 00...7?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Assasin
            sc = new CTOS.ShellCommand(this.shellAssassin, "assassin!", "- Are there assassins hiding?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Templar
            sc = new CTOS.ShellCommand(this.shellTemplar, "templar!", "- Are there any Templar schemes afoot?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Ezio
            sc = new CTOS.ShellCommand(this.shellEzio, "ezio!", "- Clearly the best Assassin.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Insanity
            sc = new CTOS.ShellCommand(this.shellInsanity, "insanity?", "- What is it?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Watch_Dogs
            sc = new CTOS.ShellCommand(this.shellWatchDogs, "watch_dogs", "- DeadSec is here?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            //
            // Display the initial prompt.
            this.PutPrompt();
        };

        Shell.prototype.PutPrompt = function () {
            if (!CTOS.Globals.m_StdOut.m_BSOD) {
                CTOS.Globals.m_StdOut.PutText(this.m_PromptStr);
            }
        };

        // Command suggesting
        Shell.prototype.SuggestCmd = function (buffer) {
            //
            // Parse the input...
            //
            var userCommand = new CTOS.UserCommand();
            userCommand = this.ParseInput(buffer);

            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;

            for (var i = 0; i < this.m_CommandList.length; ++i) {
                if (this.m_CommandList[i].command.indexOf(userCommand.command) == 0) {
                    return this.m_CommandList[i].command;
                }
            }

            // Failed to find at least one
            return "";
        };

        Shell.prototype.HandleInput = function (buffer) {
            CTOS.Globals.m_Kernel.Trace("Shell Command~" + buffer);

            //
            // Parse the input...
            //
            var userCommand = new CTOS.UserCommand();
            userCommand = this.ParseInput(buffer);

            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;

            //
            // Determine the command and execute it.
            //
            // JavaScript may not support associative arrays in all browsers so we have to
            // iterate over the command list in attempt to find a match.  TODO: Is there a better way? Probably.
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.m_CommandList.length) {
                if (this.m_CommandList[index].command === cmd) {
                    found = true;
                    fn = this.m_CommandList[index].func;
                } else {
                    ++index;
                }
            }
            if (found) {
                this.Execute(fn, args);
            } else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.m_Curses.indexOf("[" + CTOS.Utils.rot13(cmd) + "]") >= 0) {
                    // Check for curses.
                    this.Execute(this.shellCurse);
                } else if (this.m_Apologies.indexOf("[" + cmd + "]") >= 0) {
                    // Check for apologies.
                    this.Execute(this.shellApology);
                } else if ("svir" == CTOS.Utils.rot13(cmd)) {
                    var inputMsg = "svir";
                    for (var i = 0; i < args.length; ++i) {
                        inputMsg += " " + CTOS.Utils.rot13(args[i]);
                    }
                    if (inputMsg == this.m_SecretMsg.toLowerCase()) {
                        this.Execute(this.shellSecret);
                    } else {
                        // It's just a bad command.
                        this.Execute(this.shellInvalidCommand);
                    }
                } else {
                    // It's just a bad command.
                    this.Execute(this.shellInvalidCommand);
                }
            }
        };

        // args is an option parameter, ergo the ? which allows TypeScript to understand that
        Shell.prototype.Execute = function (fn, args) {
            // We just got a command, so advance the line...
            CTOS.Globals.m_StdOut.AdvanceLine();

            // ... call the command function passing in the args...
            fn(args);

            // Check to see if we need to advance the line again
            if (CTOS.Globals.m_StdOut.m_CurrentXPosition > 0) {
                CTOS.Globals.m_StdOut.AdvanceLine();
            }

            // ... and finally write the prompt again.
            this.PutPrompt();
        };

        Shell.prototype.ParseInput = function (buffer) {
            var retVal = new CTOS.UserCommand();

            // 1. Remove leading and trailing spaces.
            buffer = CTOS.Utils.trim(buffer);

            // 2. Lower-case it.
            buffer = buffer.toLowerCase();

            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");

            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift();

            // 4.1 Remove any left-over spaces.
            cmd = CTOS.Utils.trim(cmd);

            // 4.2 Record it in the return value.
            retVal.command = cmd;

            for (var i in tempList) {
                var arg = CTOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        };

        //
        // Shell Command Functions.  Again, not part of Shell() class per se', just called from there.
        //
        Shell.prototype.shellInvalidCommand = function () {
            CTOS.Globals.m_StdOut.PutText("Invalid Command. ");
            if (CTOS.Globals.m_SarcasticMode) {
                CTOS.Globals.m_StdOut.PutText("Duh. Go back to your Speak & Spell.");
            } else {
                CTOS.Globals.m_StdOut.PutText("Type 'help' for, well... help.");
            }
        };

        Shell.prototype.shellDate = function () {
            var currentDate = new Date();
            CTOS.Globals.m_StdOut.PutText(currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString());
        };

        Shell.prototype.shellWhereAmI = function () {
            CTOS.Globals.m_AchievementSystem.Unlock(5);
            CTOS.Globals.m_StdOut.PutText("Racoon City"); //This is a lie, we're in New York. This is a conflict!
        };

        Shell.prototype.shellVer = function (args) {
            CTOS.Globals.m_StdOut.PutText(CTOS.Globals.APP_NAME + " version " + CTOS.Globals.APP_VERSION);
            CTOS.Globals.m_StdOut.AdvanceLine();
            CTOS.Globals.m_StdOut.PutText("Improving New York City.");
            CTOS.Globals.m_StdOut.AdvanceLine();
            CTOS.Globals.m_StdOut.PutText("Ensuring the future through CenTral Operating System");
        };

        Shell.prototype.shellLoad = function () {
            var programToParse = CTOS.Globals.m_ProgramInput.innerHTML;
            programToParse = CTOS.Utils.trim(programToParse); // Remove leading and trailing spaces
            var programInput = programToParse.split(" ");
            var isValid = true;
            if (programInput.length > 0) {
                programInput.every(function (code) {
                    if (!CTOS.Utils.IsValidHex(code)) {
                        isValid = false;
                        CTOS.Globals.m_StdOut.PutText("Invalid program input! No cake for you!");
                        CTOS.Globals.m_StdOut.AdvanceLine();
                        CTOS.Globals.m_StdOut.PutText("First issue: " + code);
                        return false;
                    } else {
                        return true;
                    }
                });
            } else {
                isValid = false;
            }

            if (isValid) {
                CTOS.Globals.m_AchievementSystem.Unlock(11);
                CTOS.Globals.m_StdOut.PutText("Valid hex & space program input! Want some cake?");
                CTOS.Globals.m_StdOut.PutText(CTOS.Globals.m_MemoryManager.LoadProgram(programInput).toString() + " has been loaded!");
            }
        };

        Shell.prototype.shellRun = function (args) {
            if (args.length == 1) {
                var pcb = CTOS.Globals.m_KernelResidentQueue.dequeueAtIndex(args[0]);
                if (pcb) {
                    CTOS.Globals.m_KernelReadyQueue.enqueue(pcb);
                } else {
                    CTOS.Globals.m_StdOut.PutText("PID is not in Resident Queue");
                }
            } else {
                CTOS.Globals.m_StdOut.PutText("Usage: run <PID>  Please supply a single PID.");
            }
        };

        Shell.prototype.shellHelp = function (args) {
            CTOS.Globals.m_StdOut.PutText("Commands:");
            for (var i in CTOS.Globals.m_OsShell.m_CommandList) {
                CTOS.Globals.m_StdOut.AdvanceLine();
                CTOS.Globals.m_StdOut.PutText("  " + CTOS.Globals.m_OsShell.m_CommandList[i].command + " " + CTOS.Globals.m_OsShell.m_CommandList[i].description);
            }
        };

        Shell.prototype.shellShutdown = function (args) {
            CTOS.Globals.m_StdOut.PutText("Shutting down...");

            // Call Kernel shutdown routine.
            CTOS.Globals.m_Kernel.Shutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        };

        Shell.prototype.shellCls = function (args) {
            CTOS.Globals.m_StdOut.ClearScreen();
            CTOS.Globals.m_StdOut.ResetXY();
        };

        Shell.prototype.shellMan = function (args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        CTOS.Globals.m_StdOut.PutText("Help displays a list of (hopefully) valid commands.");
                        break;
                    default:
                        CTOS.Globals.m_StdOut.PutText("No manual entry for " + args[0] + ".");
                }
            } else {
                CTOS.Globals.m_StdOut.PutText("Usage: man <topic>  Please supply a topic.");
            }
        };

        Shell.prototype.shellTrace = function (args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (CTOS.Globals.m_Trace && CTOS.Globals.m_SarcasticMode) {
                            CTOS.Globals.m_StdOut.PutText("Trace is already on, dumbass.");
                        } else {
                            CTOS.Globals.m_Trace = true;
                            CTOS.Globals.m_StdOut.PutText("Trace ON");
                        }

                        break;
                    case "off":
                        CTOS.Globals.m_Trace = false;
                        CTOS.Globals.m_StdOut.PutText("Trace OFF");
                        break;
                    default:
                        CTOS.Globals.m_StdOut.PutText("Invalid arguement.  Usage: trace <on | off>.");
                }
            } else {
                CTOS.Globals.m_StdOut.PutText("Usage: trace <on | off>");
            }
        };

        Shell.prototype.shellRot13 = function (args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                CTOS.Globals.m_StdOut.PutText(args.join(' ') + " = '" + CTOS.Utils.rot13(args.join(' ')) + "'");
            } else {
                CTOS.Globals.m_StdOut.PutText("Usage: rot13 <string>  Please supply a string.");
            }
        };

        Shell.prototype.shellPrompt = function (args) {
            if (args.length > 0) {
                CTOS.Globals.m_OsShell.m_PromptStr = args[0];
            } else {
                CTOS.Globals.m_StdOut.PutText("Usage: prompt <string>  Please supply a string.");
            }
        };

        Shell.prototype.shellStatus = function (args) {
            if (args.length > 0) {
                var status = "";
                for (var i = 0; i < args.length; ++i) {
                    status += args[i] + " ";
                }

                CTOS.Globals.m_Status.textContent = "Status : " + status;
                CTOS.Globals.m_StdOut.PutText("Status updated to: " + status);
                CTOS.Globals.m_AchievementSystem.Unlock(12);
            } else {
                CTOS.Globals.m_StdOut.PutText("Usage: status <string> Please supply a string.");
            }
        };

        // BSOD & Shutdown
        Shell.prototype.shellExplode = function () {
            CTOS.Globals.m_AchievementSystem.Unlock(4);
            CTOS.Globals.m_Kernel.TrapError("You did this.");
        };

        /* ---
        Silly stuff because I can do this all day.
        --- */
        // Pass our secret array, get a random surprise!!
        Shell.prototype.RandomSecretUncipher = function (messages) {
            // Get a random index from our array of secret nugetty goodness
            var secretIndex = Math.floor(Math.random() * (messages.length - 1));

            // \ formating makes a tab, remove it
            var secretMsgTabbed = messages[secretIndex].replace('\t', '');

            // I came up with an arbitrary new line marked by ;
            var secretMsgSplit = secretMsgTabbed.split(";");
            for (var i = 0; i < secretMsgSplit.length; ++i) {
                // Trim and uncipher the string at the index. Each index is a new line.
                CTOS.Globals.m_StdOut.PutText(CTOS.Utils.trim(CTOS.Utils.rot13(secretMsgSplit[i])));
                CTOS.Globals.m_StdOut.AdvanceLine();
                CTOS.Globals.m_StdOut.AdvanceLine();
            }
        };

        Shell.prototype.shellAlan = function () {
            CTOS.Globals.m_AchievementSystem.Unlock(1);
            CTOS.Globals.m_OsShell.RandomSecretUncipher(_SecretAlan);
        };

        Shell.prototype.shellInsanity = function () {
            CTOS.Globals.m_AchievementSystem.Unlock(10);

            // FarCry too gud
            CTOS.Globals.m_StdOut.PutText("Did I ever tell you what the definition of insanity is? " + "Insanity is doing the exact... same fucking thing..." + "over and over again expecting shit to change... That.Is.Crazy.");
        };

        Shell.prototype.shellWatchDogs = function () {
            CTOS.Globals.m_AchievementSystem.Unlock(8);
            CTOS.Globals.m_StdOut.PutText("_we are watching _we are all connected");
            CTOS.Globals.m_StdOut.AdvanceLine();
            CTOS.Globals.m_StdOut.PutText("_hacking is our weapon _Connection is power");
        };

        Shell.prototype.shellAssassin = function () {
            CTOS.Globals.m_AchievementSystem.Unlock(3);
            CTOS.Globals.m_OsShell.RandomSecretUncipher(_SecretAssassin);
        };

        Shell.prototype.shellTemplar = function () {
            CTOS.Globals.m_AchievementSystem.Unlock(2);
            CTOS.Globals.m_OsShell.RandomSecretUncipher(_SecretTemplar);
        };

        Shell.prototype.shellEzio = function () {
            CTOS.Globals.m_AchievementSystem.Unlock(7);
            CTOS.Globals.m_OsShell.RandomSecretUncipher(_SecretEzio);
        };

        Shell.prototype.shellSecret = function () {
            CTOS.Globals.m_AchievementSystem.Unlock(9);
            CTOS.Globals.m_StdOut.PutText("GLORY TO OUR LORD AND SAVIOUR");
        };

        Shell.prototype.shellCurse = function () {
            CTOS.Globals.m_StdOut.PutText("Oh, so that's how it's going to be, eh? Fine.");
            CTOS.Globals.m_StdOut.AdvanceLine();
            CTOS.Globals.m_StdOut.PutText("Bitch.");
            CTOS.Globals.m_SarcasticMode = true;
        };

        Shell.prototype.shellApology = function () {
            if (CTOS.Globals.m_SarcasticMode) {
                CTOS.Globals.m_AchievementSystem.Unlock(10);
                CTOS.Globals.m_StdOut.PutText("Okay. I forgive you. This time.");
                CTOS.Globals.m_SarcasticMode = false;
            } else {
                CTOS.Globals.m_StdOut.PutText("For what?");
            }
        };
        return Shell;
    })();
    CTOS.Shell = Shell;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=shell.js.map
