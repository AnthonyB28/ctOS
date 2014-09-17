///<reference path="../globals.ts" />

/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell.  The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module CTOS {

    export class Console {

        constructor(public m_CurrentFont : string = _DefaultFontFamily,
                    public m_CurrentFontSize : number = _DefaultFontSize,
                    public m_CurrentXPosition : number = 0,
                    public m_CurrentYPosition : number = _DefaultFontSize,
                    public m_Buffer: string = "",
                    public m_CmdHistory: Array<string> = [],
                    public m_CmdHistoryIndex: number = 0,
                    public m_CmdHistoryMovedOnce: boolean = false)
        {

        }

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        public clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        public resetXY(): void {
            this.m_CurrentXPosition = 0;
            this.m_CurrentYPosition = this.m_CurrentFontSize + _FontHeightMargin;
        }

        public handleInput(): void {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();

                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { //     Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.m_Buffer);
                    // ... and reset our buffer.
                    if (this.m_CmdHistory.length > MAX_COMMAND_HISTORY)
                    {
                        this.m_CmdHistory.shift();
                    }
                    this.m_CmdHistory.push(this.m_Buffer);
                    this.m_CmdHistoryIndex = this.m_CmdHistory.length - 1;
                    this.m_Buffer = "";
                }

                // Backspace
                // Erase last character from the canvas and buffer
                else if(chr === String.fromCharCode(8) && this.m_Buffer.length > 0)
                {
                    //this.eraseLastCharacter();
                    this.putError("test", "ERROR TESTING");
                }

                // Tab & right arrow
                // Suggest a command
                else if ((chr == String.fromCharCode(9) || chr == String.fromCharCode(39)) && this.m_Buffer.length > 0)
                {
                    var suggestedCmd: string = _OsShell.suggestCmd(this.m_Buffer);
                    if (suggestedCmd != "")
                    {
                        this.eraseLine();
                        this.putText(suggestedCmd);
                        this.m_Buffer = suggestedCmd;
                    }
                }

                // Up
                // History of commands
                else if (chr == String.fromCharCode(38) && this.m_CmdHistory.length > 0)
                {
                    this.CmdHistoryLookup(true);
                }

                // Down
                // History of commands
                else if (chr == String.fromCharCode(40) && this.m_CmdHistory.length > 0)
                {
                    this.CmdHistoryLookup(false);
                }

                else
                {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.m_Buffer += chr;
                }
                // TODO: Write a case for Ctrl-C.
            }
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
                    // Make sure we've moved before, otherwise we skip an index
                    if (this.m_CmdHistoryMovedOnce)
                    {
                        ++this.m_CmdHistoryIndex;
                    }
                }
            }

            this.eraseLine();
            var cmd: string = this.m_CmdHistory[this.m_CmdHistoryIndex];
            this.putText(cmd);
            this.m_Buffer = cmd;
            this.m_CmdHistoryMovedOnce = true;
        }

        // Removes the entire buffer from the canvas and clears itself
        private eraseLine(): void
        {
            var offset: number = _DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_Buffer);
            var xBeginningPos: number = this.m_CurrentXPosition - offset;
            var yBeginningPos: number = this.m_CurrentYPosition + 1 - this.m_CurrentFontSize; //height is the same as font size, dont need measure
            _DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.m_CurrentXPosition, this.m_CurrentYPosition);
            this.m_CurrentXPosition = xBeginningPos;

            // Clear buffer, important
            this.m_Buffer = "";
        }

        // Removes the last character on the buffer from the canvas & the buffer itself
        private eraseLastCharacter(): void
        {
            var offset: number = _DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_Buffer.slice(-1));
            var xBeginningPos: number = this.m_CurrentXPosition - offset;
            var yBeginningPos: number = this.m_CurrentYPosition + 1 - this.m_CurrentFontSize; //height is the same as font size, dont need measure
            _DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.m_CurrentXPosition, this.m_CurrentYPosition);
            this.m_CurrentXPosition = xBeginningPos;

            // Strip last character off the buffer
            this.m_Buffer = this.m_Buffer.substr(0, this.m_Buffer.length - 1);
        }

        public putText(text): void {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.

            if (text !== "")
            {
                var offset: number = _DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, text);
                var isMultiLineWrapped: boolean = false;

                // If our position is over the width, we need to line wrap!
                if ((this.m_CurrentXPosition + offset) > _Canvas.width)
                {
                    if (text.length > 1)
                    {
                        // We have long text to break up. Need to find which index to substring
                        var indexToLineBreak: number = this.findLineWrapPosition(text);
                        var textLineBeginning: string = text.substring(0, indexToLineBreak);
                        _DrawingContext.drawText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_CurrentXPosition, this.m_CurrentYPosition, textLineBeginning);
                        this.advanceLine();
                        isMultiLineWrapped = true;
                        this.putText(text.substring(indexToLineBreak, text.length));
                    }
                    else
                    {
                        // We have only a single character to put on the canvas. Just advance line and write it as if normal.
                        this.advanceLine();
                    }                    
                }
                
                // As long as we didn't do any recursive huge line wrap just before this, simply write the text.
                if (!isMultiLineWrapped)
                {
                    // Draw the text at the current X and Y coordinates.
                    _DrawingContext.drawText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_CurrentXPosition, this.m_CurrentYPosition, text);
                }

                // Move the current X position.
                this.m_CurrentXPosition = this.m_CurrentXPosition + offset;
            }
        }

        // Finds the index of a string which needs to wrap
        private findLineWrapPosition(text : string): number
        {
            var offsetToLineBreak: number = 0;
            for (var i: number = 0; i < text.length; ++i)
            {
                // Measure each character until we breach the Canvas width
                offsetToLineBreak += _DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, text[i]);
                if (offsetToLineBreak > _Canvas.width)
                {
                    return i; // We're over the width, this is the chacter we need to split on
                }
            }
            return 0; // Never broke the width, don't need to split
        }


        // BSOD & halts program - errorType gets put on top of BSOD, message below
        public putError(errorType : string, msg: string): void
        {
            this.clearScreen();

            // Compute where the inner circle should go
            var innerCircleYPos: number = _Canvas.height / 2;

            // Create the gradient
            var grd = _DrawingContext.createRadialGradient(
                _Canvas.width / 2, innerCircleYPos, 180,
                _Canvas.width / 2, innerCircleYPos, 250);
            grd.addColorStop(0, _BSODColor); // Inner circle
            grd.addColorStop(1, getComputedStyle(_Canvas, null).getPropertyValue("background-color")); // Outer circle should be "transparent"

            // Fill with gradient
            _DrawingContext.fillStyle = grd;
            _DrawingContext.fillRect(0,
                -20,
                _Canvas.width,
                _Canvas.height + 20);

            // Compute where we need to write the text nicely
            this.m_CurrentXPosition = _Canvas.width / 3;
            this.m_CurrentYPosition = innerCircleYPos - ((_DefaultFontSize + _FontHeightMargin) * 6);

            // Write the error text, preferably within the circle
            CanvasTextFunctions.enable(_DrawingContext, "white"); // Set the text to white, maybe a simple way to do this?
            this.putText(errorType);
            this.advanceLine();
            this.m_CurrentXPosition = _Canvas.width / 5;
            this.putText(msg);
            CanvasTextFunctions.enable(_DrawingContext, "black"); // Set text back to black, just in case we write more later perhaps.

            // Shutdown! Stop input!
            Control.hostLog("Emergency halt", errorType);
            Control.hostLog("Attempting Kernel shutdown.", "BSOD");
            // Call the OS shutdown routine.
            _Kernel.krnShutdown();
            // Stop the interval that's simulating our clock pulse.
            clearInterval(_hardwareClockID);
        }

        public advanceLine(): void 
        {
            this.m_CurrentXPosition = 0;
            this.m_CurrentYPosition += _DefaultFontSize + _FontHeightMargin;

            // Auto-Scroll in the Y
            if (this.m_CurrentYPosition > _Canvas.height)
            {
                // Get the entire console we previously had as an image
                var canvasImage = _DrawingContext.getImageData(0, 0, _Canvas.width, _Canvas.height);
                // Increase the heigh and put the image above
                _Canvas.height += _DefaultFontSize + _FontHeightMargin;
                _DrawingContext.putImageData(canvasImage, 0, 0);

                // Auto-scroll down
                var elem = document.getElementById('divConsole');
                elem.scrollTop = elem.scrollHeight;
            }
        }
    }
 }
