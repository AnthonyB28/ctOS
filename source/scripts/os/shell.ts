///<reference path="shellCommand.ts" />
///<reference path="userCommand.ts" />
///<reference path="../utils.ts" />
///<reference path="../secret.ts"/>

/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

module CTOS 
{
    export class Shell 
    {
        // Properties
        public m_PromptStr : string = ">";
        public m_CommandList = [];
        public m_Curses: string = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        public m_SecretMsg: string = "Svir cyhf svir zvahf bar vf avar. Avar qvivqrq ol guerr vf guerr. Unys Yvsr 3 pbasvezrq.";
        public m_Apologies = "[sorry]";

        constructor() 
        {}

        public Init(): void
        {
            var sc = null;
            //
            // Load the command list.

            // ver
            sc = new ShellCommand(this.shellVer,
                                  "ver",
                                  "- Displays the current version data.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // load
            sc = new ShellCommand(this.shellLoad,
                                  "load",
                                  "- Loads the program from Program Input box.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // run
            sc = new ShellCommand(this.shellRun,
                                    "run",
                                    "<PID> - Runs the program by ID that is in memory.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // help
            sc = new ShellCommand(this.shellHelp,
                                  "help",
                                  "- This is the help command. Seek help.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // shutdown
            sc = new ShellCommand(this.shellShutdown,
                                  "shutdown",
                                  "- Shuts down the virtual OS but leaves the underlying hardware simulation running.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // cls
            sc = new ShellCommand(this.shellCls,
                                  "cls",
                                  "- Clears the screen and resets the cursor position.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // man <topic>
            sc = new ShellCommand(this.shellMan,
                                  "man",
                                  "<topic> - Displays the Manual page for <topic>.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // trace <on | off>
            sc = new ShellCommand(this.shellTrace,
                                  "trace",
                                  "<on | off> - Turns the OS trace on or off.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // rot13 <string>
            sc = new ShellCommand(this.shellRot13,
                                  "rot13",
                                  "<string> - Does rot13 obfuscation on <string>.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // prompt <string>
            sc = new ShellCommand(this.shellPrompt,
                                  "prompt",
                                  "<string> - Sets the prompt.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Date
            sc = new ShellCommand(this.shellDate,
                "date",
                "- Displays the current Date & Time.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // WhereAmI
            sc = new ShellCommand(this.shellWhereAmI,
                "whereami",
                "- Displays the users current location. (Lie)");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Status
            sc = new ShellCommand(this.shellStatus,
                "status",
                "<string> - Sets the status message");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Explode
            sc = new ShellCommand(this.shellExplode,
                "explode!",
                "- BSOD & Shutdown");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // processes - list the running processes and their IDs
            // kill <id> - kills the specified process id.

            /* ---
                Silly stuff cause I can do this all day.
               --- */

            // Alan
            sc = new ShellCommand(this.shellAlan,
                "alan!",
                "- 00...7?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Assasin
            sc = new ShellCommand(this.shellAssassin,
                "assassin!",
                "- Are there assassins hiding?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Templar
            sc = new ShellCommand(this.shellTemplar,
                "templar!",
                "- Are there any Templar schemes afoot?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Ezio
            sc = new ShellCommand(this.shellEzio,
                "ezio!",
                "- Clearly the best Assassin.");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Insanity
            sc = new ShellCommand(this.shellInsanity,
                "insanity?",
                "- What is it?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            // Watch_Dogs
            sc = new ShellCommand(this.shellWatchDogs,
                "watch_dogs",
                "- DeadSec is here?");
            this.m_CommandList[this.m_CommandList.length] = sc;

            //
            // Display the initial prompt.
            this.PutPrompt();
        }

        public PutPrompt(): void
        {
            if (!Globals.m_StdOut.m_BSOD)
            {
                Globals.m_StdOut.PutText(this.m_PromptStr);
            }
        }

        // Command suggesting
        public SuggestCmd(buffer): string
        {
            //
            // Parse the input...
            //
            var userCommand = new UserCommand();
            userCommand = this.ParseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;

            // Attempt to match the command substring
            for (var i: number = 0; i < this.m_CommandList.length; ++i)
            {
                if (this.m_CommandList[i].command.indexOf(userCommand.command) == 0)
                {
                    return this.m_CommandList[i].command;
                }
            }

            // Failed to find at least one
            return "";
        }

        public HandleInput(buffer): void
        {
            Globals.m_Kernel.Trace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = new UserCommand();
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
                if (this.m_Curses.indexOf("[" + Utils.rot13(cmd) + "]") >= 0) 
                {  
                     // Check for curses.
                    this.Execute(this.shellCurse);
                }
                else if (this.m_Apologies.indexOf("[" + cmd + "]") >= 0)
                {    
                    // Check for apologies.
                    this.Execute(this.shellApology);
                }
                else if ("svir" == Utils.rot13(cmd))
                {
                    var inputMsg: string = "svir";
                    for(var i : number = 0; i < args.length; ++i)
                    {
                        inputMsg += " " + Utils.rot13(args[i]);
                    }
                    if (inputMsg == this.m_SecretMsg.toLowerCase())
                    {
                        this.Execute(this.shellSecret);
                    }
                    else
                    {
                        // It's just a bad command.
                        this.Execute(this.shellInvalidCommand);
                    }
                }
                else
                { 
                    // It's just a bad command.
                    this.Execute(this.shellInvalidCommand);
                }
            }
        }

        // args is an option parameter, ergo the ? which allows TypeScript to understand that
        public Execute(fn, args?): void
        {
            // We just got a command, so advance the line...
            Globals.m_StdOut.AdvanceLine();
            // ... call the command function passing in the args...
            fn(args);
            // Check to see if we need to advance the line again
            if (Globals.m_StdOut.m_CurrentXPosition > 0) 
            {
                Globals.m_StdOut.AdvanceLine();
            }
            // ... and finally write the prompt again.
            this.PutPrompt();
        }

        public ParseInput(buffer) : UserCommand
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
            Globals.m_StdOut.PutText("Invalid Command. ");
            if (Globals.m_SarcasticMode)
            {
                Globals.m_StdOut.PutText("Duh. Go back to your Speak & Spell.");
            } else
            {
                Globals.m_StdOut.PutText("Type 'help' for, well... help.");
            }
        }

        public shellDate() : void
        {
            var currentDate: Date = new Date();
            Globals.m_StdOut.PutText(currentDate.toLocaleDateString() + " " +currentDate.toLocaleTimeString());
        }

        public shellWhereAmI() : void
        {
            Globals.m_AchievementSystem.Unlock(5);
            Globals.m_StdOut.PutText("Racoon City"); //This is a lie, we're in New York. This is a conflict!
        }

        public shellVer(args): void
        {
            Globals.m_StdOut.PutText(Globals.APP_NAME + " version " + Globals.APP_VERSION);
            Globals.m_StdOut.AdvanceLine();
            Globals.m_StdOut.PutText("Improving New York City.");
            Globals.m_StdOut.AdvanceLine();
            Globals.m_StdOut.PutText("Ensuring the future through CenTral Operating System");
        }

        public shellLoad(): void
        {
            var programToParse: string = Globals.m_ProgramInput.value;
            programToParse = Utils.trim(programToParse); // Remove leading and trailing spaces
            var programInput: Array<string> = programToParse.split(" "); // Split to each code
            var isValid: boolean = true;
            var invalidMsg = "";
            if (programInput.length > 0)
            {
                programInput.every(function (code) // JS can't break a ForEach? WTF
                {
                    if (!Utils.IsValidHex(code))
                    {
                        isValid = false;
                        invalidMsg = code;
                        return false; // stop the loop
                    }
                    else
                    {
                        return true; // continue the loop
                    }
                });
            }
            else
            {
                isValid = false;
                invalidMsg = "Empty";
            }

            if (isValid)
            {
                Globals.m_AchievementSystem.Unlock(11);
                //Globals.m_StdOut.PutText("Valid hex & space program input! Want some cake?");
                Globals.m_StdOut.PutText("PID[" + Globals.m_MemoryManager.LoadProgram(programInput).toString() + "] has been loaded!");
            }
            else
            {
                Globals.m_StdOut.PutText("Invalid program input! No cake for you!");
                Globals.m_StdOut.AdvanceLine();
                Globals.m_StdOut.PutText("Issue: " + invalidMsg);
            }
        }

        // Run a program using a PID in args
        public shellRun(args): void
        {
            if (args.length == 1) // Must have a PID provided
            {
                var pcb: ProcessControlBlock = null;

                // Need to check to see if a PCB is in the Resident Queue
                for (var i = 0; i < Globals.m_KernelResidentQueue.getSize(); ++i)
                {
                    var pcbInQueue: ProcessControlBlock = Globals.m_KernelResidentQueue.peek(i);
                    if (pcbInQueue.m_PID == args[0])
                    {
                        pcb = Globals.m_KernelResidentQueue.remove(i);
                        break;
                    }
                }

                if (pcb) // Get ready to run PCB & put it in the ready queue
                {
                    pcb.m_State = ProcessControlBlock.STATE_READY;
                    Globals.m_KernelReadyQueue.enqueue(pcb);
                    Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_REQUEST_CPU_RUN_PROGRAM, null));
                }
                else // If we didn't get a pcb from the Resident Queue, then it doesn't exist to be ran
                {
                    Globals.m_StdOut.PutText("PID is not in Resident Queue");
                }
            }
            else
            {
                Globals.m_StdOut.PutText("Usage: run <PID>  Please supply a single PID.");
            }
        }

        public shellHelp(args): void
        {
            Globals.m_StdOut.PutText("Commands:");
            for (var i in Globals.m_OsShell.m_CommandList) 
            {
                Globals.m_StdOut.AdvanceLine();
                Globals.m_StdOut.PutText("  " + Globals.m_OsShell.m_CommandList[i].command + " " + Globals.m_OsShell.m_CommandList[i].description);
            }
        }

        public shellShutdown(args): void
        {
             Globals.m_StdOut.PutText("Shutting down...");
             // Call Kernel shutdown routine.
            Globals.m_Kernel.Shutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        }

        public shellCls(args): void
        {
            Globals.m_StdOut.ClearScreen();
            Globals.m_StdOut.ResetXY();
        }

        public shellMan(args): void
        {
            if (args.length > 0) 
            {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        Globals.m_StdOut.PutText("Help displays a list of (hopefully) valid commands.");
                        break;
                    default:
                        Globals.m_StdOut.PutText("No manual entry for " + args[0] + ".");
                }
            }
            else
            {
                Globals.m_StdOut.PutText("Usage: man <topic>  Please supply a topic.");
            }
        }

        public shellTrace(args): void
        {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (Globals.m_Trace && Globals.m_SarcasticMode) {
                            Globals.m_StdOut.PutText("Trace is already on, dumbass.");
                        } else {
                            Globals.m_Trace = true;
                            Globals.m_StdOut.PutText("Trace ON");
                        }

                        break;
                    case "off":
                        Globals.m_Trace = false;
                        Globals.m_StdOut.PutText("Trace OFF");
                        break;
                    default:
                        Globals.m_StdOut.PutText("Invalid arguement.  Usage: trace <on | off>.");
                }
            } else {
                Globals.m_StdOut.PutText("Usage: trace <on | off>");
            }
        }

        public shellRot13(args): void
        {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                Globals.m_StdOut.PutText(args.join(' ') + " = '" + Utils.rot13(args.join(' ')) +"'");
            } else {
                Globals.m_StdOut.PutText("Usage: rot13 <string>  Please supply a string.");
            }
        }

        public shellPrompt(args): void
        {
            if (args.length > 0) 
            {
                Globals.m_OsShell.m_PromptStr = args[0];
            }
            else
            {
                Globals.m_StdOut.PutText("Usage: prompt <string>  Please supply a string.");
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

                Globals.m_Status.textContent = "Status : " + status;
                Globals.m_StdOut.PutText("Status updated to: " + status);
                Globals.m_AchievementSystem.Unlock(12);
            }
            else
            {
                Globals.m_StdOut.PutText("Usage: status <string> Please supply a string.");
            }
        }

        // BSOD & Shutdown
        public shellExplode()
        {
            Globals.m_AchievementSystem.Unlock(4);
            Globals.m_Kernel.TrapError("You did this.");
        }

        /* --- 
            Silly stuff because I can do this all day.
           --- */

        // Pass our secret array, get a random surprise!!
        public RandomSecretUncipher(messages: Array<string>)
        {
            // Get a random index from our array of secret nugetty goodness
            var secretIndex: number = Math.floor(Math.random() * (messages.length - 1));

            // \ formating makes a tab, remove it
            var secretMsgTabbed: string = messages[secretIndex].replace('\t', '');

            // I came up with an arbitrary new line marked by ;
            var secretMsgSplit: Array<string> = secretMsgTabbed.split(";");
            for (var i: number = 0; i < secretMsgSplit.length; ++i)
            {
                // Trim and uncipher the string at the index. Each index is a new line.
                Globals.m_StdOut.PutText(Utils.trim(Utils.rot13(secretMsgSplit[i])));
                Globals.m_StdOut.AdvanceLine();
                Globals.m_StdOut.AdvanceLine();
            }
        }

        public shellAlan(): void
        {
            Globals.m_AchievementSystem.Unlock(1);
            Globals.m_OsShell.RandomSecretUncipher(_SecretAlan);
        }

        public shellInsanity(): void
        {
            Globals.m_AchievementSystem.Unlock(10);
            // FarCry too gud
            Globals.m_StdOut.PutText("Did I ever tell you what the definition of insanity is? " +
                            "Insanity is doing the exact... same fucking thing..." + 
                            "over and over again expecting shit to change... That.Is.Crazy.");
        }

        public shellWatchDogs(): void
        {
            Globals.m_AchievementSystem.Unlock(8);
            Globals.m_StdOut.PutText("_we are watching _we are all connected");
            Globals.m_StdOut.AdvanceLine();
            Globals.m_StdOut.PutText("_hacking is our weapon _Connection is power");
        }

        public shellAssassin(): void
        {
            Globals.m_AchievementSystem.Unlock(3);
            Globals.m_OsShell.RandomSecretUncipher(_SecretAssassin);
        }

        public shellTemplar(): void
        {
            Globals.m_AchievementSystem.Unlock(2);
            Globals.m_OsShell.RandomSecretUncipher(_SecretTemplar);
        }

        public shellEzio(): void
        {
            Globals.m_AchievementSystem.Unlock(7);
            Globals.m_OsShell.RandomSecretUncipher(_SecretEzio);
        }

        public shellSecret(): void
        {
            Globals.m_AchievementSystem.Unlock(9);
            Globals.m_StdOut.PutText("GLORY TO OUR LORD AND SAVIOUR");
        }

        public shellCurse(): void
        {
            Globals.m_StdOut.PutText("Oh, so that's how it's going to be, eh? Fine.");
            Globals.m_StdOut.AdvanceLine();
            Globals.m_StdOut.PutText("Bitch.");
            Globals.m_SarcasticMode = true;
        }

        public shellApology(): void
        {
            if (Globals.m_SarcasticMode)
            {
                Globals.m_AchievementSystem.Unlock(10);
                Globals.m_StdOut.PutText("Okay. I forgive you. This time.");
                Globals.m_SarcasticMode = false;
            } else
            {
                Globals.m_StdOut.PutText("For what?");
            }
        }

    }
}
