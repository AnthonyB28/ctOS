///<reference path="../globals.ts" />

/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell.  The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module CTOS {

    export class Console {

        constructor(public m_CurrentFont: string = Globals.m_DefaultFontFamily,
                    public m_CurrentFontSize : number = Globals.m_DefaultFontSize,
                    public m_CurrentXPosition : number = 0,
                    public m_CurrentYPosition : number = Globals.m_DefaultFontSize,
                    public m_Buffer: string = "",
                    public m_CmdHistory: Array<string> = [],
                    public m_CmdHistoryIndex: number = 0,
                    public m_CmdHistoryMovedOnce: boolean = false,
                    public m_BSOD : boolean = false)
        {

        }

        public Init(): void 
        {
            this.ClearScreen();
            this.ResetXY();
        }

        public ClearScreen(): void 
        {
            Globals.m_DrawingContext.clearRect(0, 0, Globals.m_Canvas.width, Globals.m_Canvas.height);
            //Control.scrollConsoleTop();
            Globals.m_Canvas.height = 500;
        }

        public ResetXY(): void 
        {
            this.m_CurrentXPosition = 0;
            this.m_CurrentYPosition = this.m_CurrentFontSize + Globals.m_FontHeightMargin;
        }

        public HandleInput(): void 
        {
            while (Globals.m_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = Globals.m_KernelInputQueue.dequeue();

                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { //     Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    Globals.m_OsShell.HandleInput(this.m_Buffer);
                    // ... and reset our buffer.
                    if (this.m_CmdHistory.length > Globals.MAX_COMMAND_HISTORY)
                    {
                        this.m_CmdHistory.shift();
                    }
                    this.m_CmdHistory.push(this.m_Buffer);
                    this.m_CmdHistoryIndex = this.m_CmdHistory.length; // Out of bounds, will be handled
                    if (!this.m_CmdHistoryMovedOnce)
                    {
                        --this.m_CmdHistoryIndex; // If not moved once, need to decrement
                    }
                    this.m_Buffer = "";
                }

                // Backspace
                // Erase last character from the canvas and buffer
                else if(chr === String.fromCharCode(8))
                {
                    this.EraseLastCharacter();
                }

                // Tab & right arrow
                // Suggest a command
                else if ((chr == String.fromCharCode(9) || chr == "39") && this.m_Buffer.length > 0)
                {
                    var suggestedCmd: string = Globals.m_OsShell.SuggestCmd(this.m_Buffer);
                    if (suggestedCmd != "")
                    {
                        this.EraseLine();
                        this.PutText(suggestedCmd);
                        this.m_Buffer = suggestedCmd;
                    }
                }

                // Up
                // History of commands
                else if (chr == "38" && this.m_CmdHistory.length > 0)
                {
                    this.CmdHistoryLookup(true);
                }

                // Down
                // History of commands
                else if (chr == "40" && this.m_CmdHistory.length > 0)
                {
                    this.CmdHistoryLookup(false);
                }

                else
                {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.PutText(chr);
                    // ... and add it to our buffer.
                    this.m_Buffer += chr;
                }
                // TODO: Write a case for Ctrl-C.
            }
        }

        // Program requested System call
        public SysCall(msg : string): void
        {
            this.PutText(msg);
            this.AdvanceLine();
            Globals.m_OsShell.PutPrompt();
        }

        // Writes the cmd from history based on cmdHistoryIndex to buffer and canvas
        // up is true if going back in the history (up arrow) - decrements cmdHistoryIndex
        private CmdHistoryLookup(up: boolean): void
        {
            // Go forward in history
            if (up)
            {
                // Don't go out of bounds
                if (this.m_CmdHistoryIndex != 0)
                {
                    // Make sure we've moved before, otherwise we'll skip an index
                    if (this.m_CmdHistoryMovedOnce)
                    {
                        --this.m_CmdHistoryIndex;
                    }
                }
            }
            else // Go back in history
            {
                // Don't go out of bounds
                if (this.m_CmdHistoryIndex != this.m_CmdHistory.length - 1)
                {
                    // Safety out of bounds check, if we bottom out and continue to move down
                    if (this.m_CmdHistoryIndex == this.m_CmdHistory.length + 1)
                    {
                        this.m_CmdHistoryIndex = this.m_CmdHistory.length - 1;
                    }
                    else
                    {
                        // Make sure we've moved before, otherwise we skip an index
                        if (this.m_CmdHistoryMovedOnce)
                        {
                            ++this.m_CmdHistoryIndex;
                        }
                    }
                }
            }

            this.EraseLine();
            var cmd: string = this.m_CmdHistory[this.m_CmdHistoryIndex];
            if (!cmd)
            {
                cmd = this.m_CmdHistory[this.m_CmdHistory.length - 1];
            }
            this.PutText(cmd);
            this.m_Buffer = cmd;
            this.m_CmdHistoryMovedOnce = true;
        }

        // Removes the entire buffer from the canvas and clears itself
        private EraseLine(): void
        {
            var offset: number = Globals.m_DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_Buffer);
            var xBeginningPos: number = this.m_CurrentXPosition - offset;
            var yBeginningPos: number = this.m_CurrentYPosition + 1 - this.m_CurrentFontSize; //height is the same as font size, dont need measure
            Globals.m_DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.m_CurrentXPosition, this.m_CurrentYPosition);
            this.m_CurrentXPosition = xBeginningPos;

            // Clear buffer, important
            this.m_Buffer = "";
        }

        // Removes the last character on the buffer from the canvas & the buffer itself
        private EraseLastCharacter(): void
        {
            if (this.m_Buffer.length > 0)
            {
                var offset: number = Globals.m_DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_Buffer.slice(-1));
                var xBeginningPos: number = this.m_CurrentXPosition - offset;
                var yBeginningPos: number = this.m_CurrentYPosition + 1 - this.m_CurrentFontSize; //height is the same as font size, dont need measure
                Globals.m_DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.m_CurrentXPosition, this.m_CurrentYPosition);
                this.m_CurrentXPosition = xBeginningPos;

                // Strip last character off the buffer
                this.m_Buffer = this.m_Buffer.substr(0, this.m_Buffer.length - 1);
            }
        }

        public PutText(text : string): void {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.

            if (text !== "")
            {
                var offset: number = Globals.m_DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, text);
                var isMultiLineWrapped: boolean = false;

                // If our position is over the width, we need to line wrap!
                if ((this.m_CurrentXPosition + offset) > Globals.m_Canvas.width)
                {
                    if (text.length > 1)
                    {
                        // We have long text to break up. Need to find which index to substring
                        var indexToLineBreak: number = this.FindLineWrapPosition(text);
                        var textLineBeginning: string = text.substring(0, indexToLineBreak);
                        Globals.m_DrawingContext.drawText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_CurrentXPosition, this.m_CurrentYPosition, textLineBeginning);
                        this.AdvanceLine();
                        isMultiLineWrapped = true;
                        this.PutText(text.substring(indexToLineBreak, text.length));
                    }
                    else
                    {
                        // We have only a single character to put on the canvas. Just advance line and write it as if normal.
                        this.AdvanceLine();
                    }                    
                }
                
                // As long as we didn't do any recursive huge line wrap just before this, simply write the text.
                if (!isMultiLineWrapped)
                {
                    // Draw the text at the current X and Y coordinates.
                    Globals.m_DrawingContext.drawText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_CurrentXPosition, this.m_CurrentYPosition, text);
                }

                // Move the current X position.
                this.m_CurrentXPosition = this.m_CurrentXPosition + offset;
            }
        }

        // Finds the index of a string which needs to wrap
        private FindLineWrapPosition(text : string): number
        {
            var offsetToLineBreak: number = 0;
            for (var i: number = 0; i < text.length; ++i)
            {
                // Measure each character until we breach the Canvas width
                offsetToLineBreak += Globals.m_DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, text[i]);
                if (offsetToLineBreak > Globals.m_Canvas.width)
                {
                    return i; // We're over the width, this is the chacter we need to split on
                }
            }
            return 0; // Never broke the width, don't need to split
        }


        // BSOD & halts program - errorType gets put on top of BSOD, message below
        public DrawError(errorType : string, msg: string): void
        {
            this.m_BSOD = true;
            this.ClearScreen();

            // Compute where the inner circle should go
            var innerCircleYPos: number = Globals.m_Canvas.height / 2;

            // Create the gradient
            var grd = Globals.m_DrawingContext.createRadialGradient(
                Globals.m_Canvas.width / 2, innerCircleYPos, 180,
                Globals.m_Canvas.width / 2, innerCircleYPos, 250);
            grd.addColorStop(0, Globals.m_BSODColor); // Inner circle
            grd.addColorStop(1, getComputedStyle(Globals.m_Canvas, null).getPropertyValue("background-color")); // Outer circle should be "transparent"

            // Fill with gradient
            Globals.m_DrawingContext.fillStyle = grd;
            Globals.m_DrawingContext.fillRect(0,
                -20,
                Globals.m_Canvas.width,
                Globals.m_Canvas.height + 20);

            // Compute where we need to write the text nicely
            this.m_CurrentXPosition = Globals.m_Canvas.width / 3;
            this.m_CurrentYPosition = innerCircleYPos - ((Globals.m_DefaultFontSize + Globals.m_FontHeightMargin) * 6);

            // Write the error text, preferably within the circle
            CanvasTextFunctions.Enable(Globals.m_DrawingContext, "white"); // Set the text to white, maybe a simple way to do this?
            this.PutText(errorType);
            this.AdvanceLine();
            this.m_CurrentXPosition = Globals.m_Canvas.width / 5;
            this.PutText(msg);
            CanvasTextFunctions.Enable(Globals.m_DrawingContext, "black"); // Set text back to black, just in case we write more later perhaps.
        }

        public AdvanceLine(): void 
        {
            this.m_CurrentXPosition = 0;
            var newLineSpace: number = Globals.m_DefaultFontSize + Globals.m_FontHeightMargin;
            this.m_CurrentYPosition += newLineSpace;

            // Auto-Scroll in the Y
            if (this.m_CurrentYPosition > Globals.m_Canvas.height)
            {
                // Get the entire console we previously had as an image
                var canvasImage = Globals.m_DrawingContext.getImageData(0, newLineSpace, Globals.m_Canvas.width, Globals.m_Canvas.height);
                // Increase the heigh and put the image above
                //Globals.m_Canvas.height += newLineSpace;
                Globals.m_DrawingContext.putImageData(canvasImage, 0, 0);
                this.m_CurrentYPosition -= newLineSpace;
                //Control.scrollConsoleDown();
            }
        }
    }
 }
