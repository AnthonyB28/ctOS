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
            this.promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
        }
        Shell.prototype.init = function () {
            var sc = null;

            //
            // Load the command list.
            // ver
            sc = new CTOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;

            // load
            sc = new CTOS.ShellCommand(this.shellLoad, "load", "- Loads the program from Program Input box.");
            this.commandList[this.commandList.length] = sc;

            // help
            sc = new CTOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;

            // shutdown
            sc = new CTOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying hardware simulation running.");
            this.commandList[this.commandList.length] = sc;

            // cls
            sc = new CTOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;

            // man <topic>
            sc = new CTOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;

            // trace <on | off>
            sc = new CTOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;

            // rot13 <string>
            sc = new CTOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;

            // prompt <string>
            sc = new CTOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;

            // Date
            sc = new CTOS.ShellCommand(this.shellDate, "date", "- Displays the current Date & Time.");
            this.commandList[this.commandList.length] = sc;

            // WhereAmI
            sc = new CTOS.ShellCommand(this.shellWhereAmI, "whereami", "- Displays the users current location. (Lie)");
            this.commandList[this.commandList.length] = sc;

            // Status
            sc = new CTOS.ShellCommand(this.shellStatus, "status", "<string> - Sets the status message");
            this.commandList[this.commandList.length] = sc;

            // Explode
            sc = new CTOS.ShellCommand(this.shellExplode, "explode!", "- BSOD & Shutdown");
            this.commandList[this.commandList.length] = sc;

            // processes - list the running processes and their IDs
            // kill <id> - kills the specified process id.
            /* ---
            Silly stuff cause I can do this all day.
            --- */
            // Alan
            sc = new CTOS.ShellCommand(this.shellAlan, "alan!", "- 00...7?");
            this.commandList[this.commandList.length] = sc;

            // Assasin
            sc = new CTOS.ShellCommand(this.shellAssassin, "assassin!", "- Are there assassins hiding?");
            this.commandList[this.commandList.length] = sc;

            // Templar
            sc = new CTOS.ShellCommand(this.shellTemplar, "templar!", "- Are there any Templar schemes afoot?");
            this.commandList[this.commandList.length] = sc;

            // Ezio
            sc = new CTOS.ShellCommand(this.shellEzio, "ezio!", "- Clearly the best Assassin.");
            this.commandList[this.commandList.length] = sc;

            // Insanity
            sc = new CTOS.ShellCommand(this.shellInsanity, "insanity?", "- What is it?");
            this.commandList[this.commandList.length] = sc;

            // Watch_Dogs
            sc = new CTOS.ShellCommand(this.shellWatchDogs, "watch_dogs", "- DeadSec is here?");
            this.commandList[this.commandList.length] = sc;

            //
            // Display the initial prompt.
            this.putPrompt();
        };

        Shell.prototype.putPrompt = function () {
            CTOS.Globals.m_StdOut.PutText(this.promptStr);
        };

        // Command suggesting
        Shell.prototype.suggestCmd = function (buffer) {
            //
            // Parse the input...
            //
            var userCommand = new CTOS.UserCommand();
            userCommand = this.parseInput(buffer);

            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;

            for (var i = 0; i < this.commandList.length; ++i) {
                if (this.commandList[i].command.indexOf(userCommand.command) == 0) {
                    return this.commandList[i].command;
                }
            }

            // Failed to find at least one
            return "";
        };

        Shell.prototype.handleInput = function (buffer) {
            CTOS.Globals.m_Kernel.Trace("Shell Command~" + buffer);

            //
            // Parse the input...
            //
            var userCommand = new CTOS.UserCommand();
            userCommand = this.parseInput(buffer);

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
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                } else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            } else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + CTOS.Utils.rot13(cmd) + "]") >= 0) {
                    this.execute(this.shellCurse);
                } else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {
                    this.execute(this.shellApology);
                } else {
                    this.execute(this.shellInvalidCommand);
                }
            }
        };

        // args is an option parameter, ergo the ? which allows TypeScript to understand that
        Shell.prototype.execute = function (fn, args) {
            // We just got a command, so advance the line...
            CTOS.Globals.m_StdOut.AdvanceLine();

            // ... call the command function passing in the args...
            fn(args);

            // Check to see if we need to advance the line again
            if (CTOS.Globals.m_StdOut.m_CurrentXPosition > 0) {
                CTOS.Globals.m_StdOut.AdvanceLine();
            }

            // ... and finally write the prompt again.
            this.putPrompt();
        };

        Shell.prototype.parseInput = function (buffer) {
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
            CTOS.Globals.m_StdOut.PutText("Racoon City"); //This is a lie, we're in New York. This is a conflict!
        };

        Shell.prototype.shellVer = function (args) {
            CTOS.Globals.m_StdOut.PutText(CTOS.Globals.APP_NAME + " version " + CTOS.Globals.APP_VERSION);
            CTOS.Globals.m_StdOut.AdvanceLine();
            CTOS.Globals.m_StdOut.PutText("Improving New York City. Ensuring the future through CenTral Operating System");
        };

        Shell.prototype.shellLoad = function (args) {
            var programToParse = CTOS.Globals.m_ProgramInput.innerHTML;
            programToParse = CTOS.Utils.trim(programToParse); // Remove leading and trailing spaces
            var programInput = programToParse.split(" ");
            var isValid = true;
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

            if (isValid) {
                CTOS.Globals.m_StdOut.PutText("Valid hex & space program input! Want some cake?");
            }
        };

        Shell.prototype.shellHelp = function (args) {
            CTOS.Globals.m_StdOut.PutText("Commands:");
            for (var i in CTOS.Globals.m_OsShell.commandList) {
                CTOS.Globals.m_StdOut.AdvanceLine();
                CTOS.Globals.m_StdOut.PutText("  " + CTOS.Globals.m_OsShell.commandList[i].command + " " + CTOS.Globals.m_OsShell.commandList[i].description);
            }
        };

        Shell.prototype.shellShutdown = function (args) {
            CTOS.Globals.m_StdOut.PutText("Shutting down...");

            // Call Kernel shutdown routine.
            CTOS.Globals.m_Kernel.Shutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        };

        Shell.prototype.shellCls = function (args) {
            CTOS.Globals.m_StdOut.clearScreen();
            CTOS.Globals.m_StdOut.resetXY();
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
                CTOS.Globals.m_OsShell.promptStr = args[0];
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
            } else {
                CTOS.Globals.m_StdOut.PutText("Usage: status <string> Please supply a string.");
            }
        };

        // BSOD & Shutdown
        Shell.prototype.shellExplode = function () {
            CTOS.Globals.m_StdOut.DrawError("EXPLOSION", "You did this.");
        };

        /* ---
        Silly stuff because I can do this all day.
        --- */
        Shell.prototype.shellAlan = function () {
            // Get a random index from our array of secret nugetty goodness
            var secretIndex = Math.floor(Math.random() * (_SecretAlan.length - 1));

            // I came up with an arbitrary new line marked by ;
            var secretMsgSplit = _SecretAlan[secretIndex].split(";");
            for (var i = 0; i < secretMsgSplit.length; ++i) {
                // Trim and uncipher the string at the index. Each index is a new line.
                CTOS.Globals.m_StdOut.PutText(CTOS.Utils.trim(CTOS.Utils.rot13(secretMsgSplit[i])));
                CTOS.Globals.m_StdOut.AdvanceLine();
                CTOS.Globals.m_StdOut.AdvanceLine();
            }
        };

        Shell.prototype.shellInsanity = function () {
            // Far Cry man
            CTOS.Globals.m_StdOut.PutText("Did I ever tell you what the definition of insanity is? " + "Insanity is doing the exact... same fucking thing..." + "over and over again expecting shit to change... That.Is.Crazy.");
        };

        Shell.prototype.shellWatchDogs = function () {
            // WashDogs
            CTOS.Globals.m_StdOut.PutText("_we are watching _we are all connected");
            CTOS.Globals.m_StdOut.AdvanceLine();
            CTOS.Globals.m_StdOut.PutText("_hacking is our weapon _Connection is power");
        };

        Shell.prototype.shellAssassin = function () {
        };

        Shell.prototype.shellTemplar = function () {
        };

        Shell.prototype.shellEzio = function () {
        };

        Shell.prototype.shellCurse = function () {
            CTOS.Globals.m_StdOut.PutText("Oh, so that's how it's going to be, eh? Fine.");
            CTOS.Globals.m_StdOut.AdvanceLine();
            CTOS.Globals.m_StdOut.PutText("Bitch.");
            CTOS.Globals.m_SarcasticMode = true;
        };

        Shell.prototype.shellApology = function () {
            if (CTOS.Globals.m_SarcasticMode) {
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
