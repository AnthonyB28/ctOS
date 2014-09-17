///<reference path="shellCommand.ts" />
///<reference path="userCommand.ts" />
///<reference path="../utils.ts" />
///<reference path="../secret.ts"/>

/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

module CTOS {
    export class Shell {
        // Properties
        public promptStr = ">";
        public commandList = [];
        public curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        public apologies = "[sorry]";

        constructor() {

        }

        public init(): void
        {
            var sc = null;
            //
            // Load the command list.

            // ver
            sc = new ShellCommand(this.shellVer,
                                  "ver",
                                  "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;

            // load
            sc = new ShellCommand(this.shellLoad,
                                  "load",
                                  "- Loads the program from Program Input box.");
            this.commandList[this.commandList.length] = sc;

            // help
            sc = new ShellCommand(this.shellHelp,
                                  "help",
                                  "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;

            // shutdown
            sc = new ShellCommand(this.shellShutdown,
                                  "shutdown",
                                  "- Shuts down the virtual OS but leaves the underlying hardware simulation running.");
            this.commandList[this.commandList.length] = sc;

            // cls
            sc = new ShellCommand(this.shellCls,
                                  "cls",
                                  "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;

            // man <topic>
            sc = new ShellCommand(this.shellMan,
                                  "man",
                                  "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;

            // trace <on | off>
            sc = new ShellCommand(this.shellTrace,
                                  "trace",
                                  "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;

            // rot13 <string>
            sc = new ShellCommand(this.shellRot13,
                                  "rot13",
                                  "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;

            // prompt <string>
            sc = new ShellCommand(this.shellPrompt,
                                  "prompt",
                                  "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;

            // Date
            sc = new ShellCommand(this.shellDate,
                "date",
                "- Displays the current Date & Time.");
            this.commandList[this.commandList.length] = sc;

            // WhereAmI
            sc = new ShellCommand(this.shellWhereAmI,
                "whereami",
                "- Displays the users current location. (Lie)");
            this.commandList[this.commandList.length] = sc;

            // Status
            sc = new ShellCommand(this.shellStatus,
                "status",
                "<string> - Sets the status message");
            this.commandList[this.commandList.length] = sc;

            // processes - list the running processes and their IDs
            // kill <id> - kills the specified process id.

            /* ---
                Silly stuff cause I can do this all day.
               --- */

            // Alan
            sc = new ShellCommand(this.shellAlan,
                "alan!",
                "- 00...7?");
            this.commandList[this.commandList.length] = sc;

            // Assasin
            sc = new ShellCommand(this.shellAssassin,
                "assassin!",
                "- Are there assassins hiding?");
            this.commandList[this.commandList.length] = sc;

            // Templar
            sc = new ShellCommand(this.shellTemplar,
                "templar!",
                "- Are there any Templar schemes afoot?");
            this.commandList[this.commandList.length] = sc;

            // Ezio
            sc = new ShellCommand(this.shellEzio,
                "ezio!",
                "- Clearly the best Assassin.");
            this.commandList[this.commandList.length] = sc;

            // Insanity
            sc = new ShellCommand(this.shellInsanity,
                "insanity?",
                "- What is it?");
            this.commandList[this.commandList.length] = sc;

            // Watch_Dogs
            sc = new ShellCommand(this.shellWatchDogs,
                "watch_dogs",
                "- DeadSec is here?");
            this.commandList[this.commandList.length] = sc;

            //
            // Display the initial prompt.
            this.putPrompt();
        }

        public putPrompt(): void
        {
            _StdOut.putText(this.promptStr);
        }

        // Command suggesting
        public suggestCmd(buffer): string
        {
            //
            // Parse the input...
            //
            var userCommand = new UserCommand();
            userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;

            // Attempt to match the command substring
            for (var i: number = 0; i < this.commandList.length; ++i)
            {
                if (this.commandList[i].command.indexOf(userCommand.command) == 0)
                {
                    return this.commandList[i].command;
                }
            }

            // Failed to find at least one
            return "";
        }

        public handleInput(buffer): void
        {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = new UserCommand();
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
                if (this.curses.indexOf("[" + Utils.rot13(cmd) + "]") >= 0) {     // Check for curses. {
                    this.execute(this.shellCurse);
                } else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {    // Check for apologies. {
                    this.execute(this.shellApology);
                } else { // It's just a bad command. {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }

        // args is an option parameter, ergo the ? which allows TypeScript to understand that
        public execute(fn, args?): void
        {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.m_CurrentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        }

        public parseInput(buffer) : UserCommand
        {
            var retVal = new UserCommand();

            // 1. Remove leading and trailing spaces.
            buffer = Utils.trim(buffer);

            // 2. Lower-case it.
            buffer = buffer.toLowerCase();

            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");

            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript.  See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;

            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }

        //
        // Shell Command Functions.  Again, not part of Shell() class per se', just called from there.
        //

        public shellInvalidCommand(): void 
        {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode)
            {
                _StdOut.putText("Duh. Go back to your Speak & Spell.");
            } else
            {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }

        public shellDate() : void
        {
            var currentDate: Date = new Date();
            _StdOut.putText(currentDate.toLocaleDateString() + " " +currentDate.toLocaleTimeString());
        }

        public shellWhereAmI() : void
        {
            _StdOut.putText("Racoon City"); //This is a lie, we're in New York. This is a conflict!
        }

        public shellVer(args): void
        {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
            _StdOut.advanceLine();
            _StdOut.putText("Improving New York City. Ensuring the future through CenTral Operating System");
        }

        public shellLoad(args): void
        {
            var programToParse: string = _ProgramInput.innerHTML;
            programToParse = Utils.trim(programToParse); // Remove leading and trailing spaces
            var programInput: Array<String> = programToParse.split(" "); // Split to each code
            var isValid: boolean = true;
            programInput.every(function(code) // JS can't break a ForEach? WTF
            {
                if (!Utils.IsValidHex(code))
                {
                    isValid = false;
                    _StdOut.putText("Invalid program input! No cake for you!");
                    _StdOut.advanceLine();
                    _StdOut.putText("First issue: " + code);
                    return false; // stop the loop
                }
                else
                {
                    return true; // continue the loop
                }
            });

            if (isValid)
            {
                _StdOut.putText("Valid hex & space program input! Want some cake?");
            }
        }

        public shellHelp(args): void
        {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }

        public shellShutdown(args): void
        {
             _StdOut.putText("Shutting down...");
             // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        }

        public shellCls(args): void
        {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        }

        public shellMan(args): void
        {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            } else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }

        public shellTrace(args): void
        {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, dumbass.");
                        } else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }

                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            } else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }

        public shellRot13(args): void
        {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + Utils.rot13(args.join(' ')) +"'");
            } else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }

        public shellPrompt(args): void
        {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            } else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }

        public shellStatus(args): void
        {
            if (args.length > 0)
            {
                var status: string = "";
                for (var i: number = 0; i < args.length; ++i)
                {
                    status += args[i] + " ";
                }

                _Status.textContent = "Status : " + status;
                _StdOut.putText("Status updated to: " + status);
            }
            else
            {
                _StdOut.putText("Usage: status <string> Please supply a string.");
            }
        }

        /* --- 
            Silly stuff because I can do this all day.
           --- */

        public shellAlan(): void
        {
            // Get a random index from our array of secret nugetty goodness
            var secretIndex: number = Math.floor(Math.random() * (_SecretAlan.length - 1));

            // I came up with an arbitrary new line marked by ;
            var secretMsgSplit: Array<string> = _SecretAlan[secretIndex].split(";");
            for(var i : number = 0; i < secretMsgSplit.length; ++i)
            {
                // Trim and uncipher the string at the index. Each index is a new line.
                _StdOut.putText(Utils.trim(Utils.rot13(secretMsgSplit[i])));
                _StdOut.advanceLine();
                _StdOut.advanceLine();
            }
        }

        public shellInsanity(): void
        {
            // Far Cry man
            _StdOut.putText("Did I ever tell you what the definition of insanity is? " +
                            "Insanity is doing the exact... same fucking thing..." + 
                            "over and over again expecting shit to change... That.Is.Crazy.");
        }

        public shellWatchDogs(): void
        {
            // WashDogs
            _StdOut.putText("_we are watching _we are all connected");
            _StdOut.advanceLine();
            _StdOut.putText("_hacking is our weapon _Connection is power");
        }

        public shellAssassin(): void
        {
        }

        public shellTemplar(): void
        {
        }

        public shellEzio(): void
        {
        }

        public shellCurse(): void
        {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }

        public shellApology(): void
        {
            if (_SarcasticMode)
            {
                _StdOut.putText("Okay. I forgive you. This time.");
                _SarcasticMode = false;
            } else
            {
                _StdOut.putText("For what?");
            }
        }

    }
}
