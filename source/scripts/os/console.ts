///<reference path="../globals.ts" />

/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell.  The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module CTOS {

    export class Console {

        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,
                    public buffer = "") {

        }

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        private clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        private resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize + _FontHeightMargin;
        }

        public handleInput(): void {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();

                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { //     Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
                    // ... and reset our buffer.
                    this.buffer = "";
                }

                // Backspace
                // Erase last character from the canvas and buffer
                else if(chr === String.fromCharCode(8) && this.buffer.length > 0)
                {
                    this.eraseLastCharacter();
                }

                // Tab
                // Suggest a command
                else if (chr == String.fromCharCode(9) && this.buffer.length > 0)
                {
                    var suggestedCommand: string = _OsShell.handleTab(this.buffer);
                    if (suggestedCommand != "")
                    {
                        this.eraseLine();
                        this.putText(suggestedCommand);
                        this.buffer = suggestedCommand;
                    }
                }

                else
                {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
                // TODO: Write a case for Ctrl-C.
            }
        }

        public eraseLine(): void
        {
            var offset: number = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer);
            var xBeginningPos: number = this.currentXPosition - offset;
            var yBeginningPos: number = this.currentYPosition + 1 - this.currentFontSize; //height is the same as font size, dont need measure
            _DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.currentXPosition, this.currentYPosition);
            this.currentXPosition = xBeginningPos;

            this.buffer = "";
        }

        // Removes the last character on the buffer from the canvas & the buffer itself
        public eraseLastCharacter(): void
        {
            var offset: number = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.slice(-1));
            var xBeginningPos: number = this.currentXPosition - offset;
            var yBeginningPos: number = this.currentYPosition + 1 - this.currentFontSize; //height is the same as font size, dont need measure
            _DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.currentXPosition, this.currentYPosition);
            this.currentXPosition = xBeginningPos;

            this.buffer = this.buffer.substr(0, this.buffer.length - 1);
        }

        public putText(text): void {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            if (text !== "") {
                // Draw the text at the current X and Y coordinates.
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                // Move the current X position.
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition + offset;
            }
         }

        public advanceLine(): void 
        {
            this.currentXPosition = 0;
            this.currentYPosition += _DefaultFontSize + _FontHeightMargin;
            // TODO: Handle scrolling. (Project 1)
        }
    }
 }
