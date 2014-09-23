///<reference path="../globals.ts" />
/* ------------
Console.ts
Requires globals.ts
The OS Console - stdIn and stdOut by default.
Note: This is not the Shell.  The Shell is the "command line interface" (CLI) or interpreter for this console.
------------ */
var CTOS;
(function (CTOS) {
    var Console = (function () {
        function Console(m_CurrentFont, m_CurrentFontSize, m_CurrentXPosition, m_CurrentYPosition, m_Buffer, m_CmdHistory, m_CmdHistoryIndex, m_CmdHistoryMovedOnce, m_BSOD) {
            if (typeof m_CurrentFont === "undefined") { m_CurrentFont = CTOS.Globals.m_DefaultFontFamily; }
            if (typeof m_CurrentFontSize === "undefined") { m_CurrentFontSize = CTOS.Globals.m_DefaultFontSize; }
            if (typeof m_CurrentXPosition === "undefined") { m_CurrentXPosition = 0; }
            if (typeof m_CurrentYPosition === "undefined") { m_CurrentYPosition = CTOS.Globals.m_DefaultFontSize; }
            if (typeof m_Buffer === "undefined") { m_Buffer = ""; }
            if (typeof m_CmdHistory === "undefined") { m_CmdHistory = []; }
            if (typeof m_CmdHistoryIndex === "undefined") { m_CmdHistoryIndex = 0; }
            if (typeof m_CmdHistoryMovedOnce === "undefined") { m_CmdHistoryMovedOnce = false; }
            if (typeof m_BSOD === "undefined") { m_BSOD = false; }
            this.m_CurrentFont = m_CurrentFont;
            this.m_CurrentFontSize = m_CurrentFontSize;
            this.m_CurrentXPosition = m_CurrentXPosition;
            this.m_CurrentYPosition = m_CurrentYPosition;
            this.m_Buffer = m_Buffer;
            this.m_CmdHistory = m_CmdHistory;
            this.m_CmdHistoryIndex = m_CmdHistoryIndex;
            this.m_CmdHistoryMovedOnce = m_CmdHistoryMovedOnce;
            this.m_BSOD = m_BSOD;
        }
        Console.prototype.Init = function () {
            this.ClearScreen();
            this.ResetXY();
        };

        Console.prototype.ClearScreen = function () {
            CTOS.Globals.m_DrawingContext.clearRect(0, 0, CTOS.Globals.m_Canvas.width, CTOS.Globals.m_Canvas.height);

            // Auto-scroll up & reset height
            var elem = document.getElementById('divConsole');
            elem.scrollTop = 0;
            CTOS.Globals.m_Canvas.height = 500;
        };

        Console.prototype.ResetXY = function () {
            this.m_CurrentXPosition = 0;
            this.m_CurrentYPosition = this.m_CurrentFontSize + CTOS.Globals.m_FontHeightMargin;
        };

        Console.prototype.HandleInput = function () {
            while (CTOS.Globals.m_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = CTOS.Globals.m_KernelInputQueue.dequeue();

                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) {
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    CTOS.Globals.m_OsShell.HandleInput(this.m_Buffer);

                    // ... and reset our buffer.
                    if (this.m_CmdHistory.length > CTOS.Globals.MAX_COMMAND_HISTORY) {
                        this.m_CmdHistory.shift();
                    }
                    this.m_CmdHistory.push(this.m_Buffer);
                    this.m_CmdHistoryIndex = this.m_CmdHistory.length; // Out of bounds, will be handled
                    if (!this.m_CmdHistoryMovedOnce) {
                        --this.m_CmdHistoryIndex; // If not moved once, need to decrement
                    }
                    this.m_Buffer = "";
                } else if (chr === String.fromCharCode(8)) {
                    this.EraseLastCharacter();
                } else if ((chr == String.fromCharCode(9) || chr == String.fromCharCode(39)) && this.m_Buffer.length > 0) {
                    var suggestedCmd = CTOS.Globals.m_OsShell.SuggestCmd(this.m_Buffer);
                    if (suggestedCmd != "") {
                        this.EraseLine();
                        this.PutText(suggestedCmd);
                        this.m_Buffer = suggestedCmd;
                    }
                } else if (chr == String.fromCharCode(38) && this.m_CmdHistory.length > 0) {
                    this.CmdHistoryLookup(true);
                } else if (chr == String.fromCharCode(40) && this.m_CmdHistory.length > 0) {
                    this.CmdHistoryLookup(false);
                } else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.PutText(chr);

                    // ... and add it to our buffer.
                    this.m_Buffer += chr;
                }
                // TODO: Write a case for Ctrl-C.
            }
        };

        // Writes the cmd from history based on cmdHistoryIndex to buffer and canvas
        // up is true if going back in the history (up arrow) - decrements cmdHistoryIndex
        Console.prototype.CmdHistoryLookup = function (up) {
            // Go forward in history
            if (up) {
                // Don't go out of bounds
                if (this.m_CmdHistoryIndex != 0) {
                    // Make sure we've moved before, otherwise we'll skip an index
                    if (this.m_CmdHistoryMovedOnce) {
                        --this.m_CmdHistoryIndex;
                    }
                }
            } else {
                // Don't go out of bounds
                if (this.m_CmdHistoryIndex != this.m_CmdHistory.length - 1) {
                    // Safety out of bounds check, if we bottom out and continue to move down
                    if (this.m_CmdHistoryIndex == this.m_CmdHistory.length + 1) {
                        this.m_CmdHistoryIndex = this.m_CmdHistory.length - 1;
                    } else {
                        // Make sure we've moved before, otherwise we skip an index
                        if (this.m_CmdHistoryMovedOnce) {
                            ++this.m_CmdHistoryIndex;
                        }
                    }
                }
            }

            this.EraseLine();
            var cmd = this.m_CmdHistory[this.m_CmdHistoryIndex];
            this.PutText(cmd);
            this.m_Buffer = cmd;
            this.m_CmdHistoryMovedOnce = true;
        };

        // Removes the entire buffer from the canvas and clears itself
        Console.prototype.EraseLine = function () {
            var offset = CTOS.Globals.m_DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_Buffer);
            var xBeginningPos = this.m_CurrentXPosition - offset;
            var yBeginningPos = this.m_CurrentYPosition + 1 - this.m_CurrentFontSize;
            CTOS.Globals.m_DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.m_CurrentXPosition, this.m_CurrentYPosition);
            this.m_CurrentXPosition = xBeginningPos;

            // Clear buffer, important
            this.m_Buffer = "";
        };

        // Removes the last character on the buffer from the canvas & the buffer itself
        Console.prototype.EraseLastCharacter = function () {
            if (this.m_Buffer.length > 0) {
                var offset = CTOS.Globals.m_DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_Buffer.slice(-1));
                var xBeginningPos = this.m_CurrentXPosition - offset;
                var yBeginningPos = this.m_CurrentYPosition + 1 - this.m_CurrentFontSize;
                CTOS.Globals.m_DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.m_CurrentXPosition, this.m_CurrentYPosition);
                this.m_CurrentXPosition = xBeginningPos;

                // Strip last character off the buffer
                this.m_Buffer = this.m_Buffer.substr(0, this.m_Buffer.length - 1);
            }
        };

        Console.prototype.PutText = function (text) {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            if (text !== "") {
                var offset = CTOS.Globals.m_DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, text);
                var isMultiLineWrapped = false;

                // If our position is over the width, we need to line wrap!
                if ((this.m_CurrentXPosition + offset) > CTOS.Globals.m_Canvas.width) {
                    if (text.length > 1) {
                        // We have long text to break up. Need to find which index to substring
                        var indexToLineBreak = this.FindLineWrapPosition(text);
                        var textLineBeginning = text.substring(0, indexToLineBreak);
                        CTOS.Globals.m_DrawingContext.drawText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_CurrentXPosition, this.m_CurrentYPosition, textLineBeginning);
                        this.AdvanceLine();
                        isMultiLineWrapped = true;
                        this.PutText(text.substring(indexToLineBreak, text.length));
                    } else {
                        // We have only a single character to put on the canvas. Just advance line and write it as if normal.
                        this.AdvanceLine();
                    }
                }

                // As long as we didn't do any recursive huge line wrap just before this, simply write the text.
                if (!isMultiLineWrapped) {
                    // Draw the text at the current X and Y coordinates.
                    CTOS.Globals.m_DrawingContext.drawText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_CurrentXPosition, this.m_CurrentYPosition, text);
                }

                // Move the current X position.
                this.m_CurrentXPosition = this.m_CurrentXPosition + offset;
            }
        };

        // Finds the index of a string which needs to wrap
        Console.prototype.FindLineWrapPosition = function (text) {
            var offsetToLineBreak = 0;
            for (var i = 0; i < text.length; ++i) {
                // Measure each character until we breach the Canvas width
                offsetToLineBreak += CTOS.Globals.m_DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, text[i]);
                if (offsetToLineBreak > CTOS.Globals.m_Canvas.width) {
                    return i;
                }
            }
            return 0;
        };

        // BSOD & halts program - errorType gets put on top of BSOD, message below
        Console.prototype.DrawError = function (errorType, msg) {
            this.m_BSOD = true;
            this.ClearScreen();

            // Compute where the inner circle should go
            var innerCircleYPos = CTOS.Globals.m_Canvas.height / 2;

            // Create the gradient
            var grd = CTOS.Globals.m_DrawingContext.createRadialGradient(CTOS.Globals.m_Canvas.width / 2, innerCircleYPos, 180, CTOS.Globals.m_Canvas.width / 2, innerCircleYPos, 250);
            grd.addColorStop(0, CTOS.Globals.m_BSODColor); // Inner circle
            grd.addColorStop(1, getComputedStyle(CTOS.Globals.m_Canvas, null).getPropertyValue("background-color")); // Outer circle should be "transparent"

            // Fill with gradient
            CTOS.Globals.m_DrawingContext.fillStyle = grd;
            CTOS.Globals.m_DrawingContext.fillRect(0, -20, CTOS.Globals.m_Canvas.width, CTOS.Globals.m_Canvas.height + 20);

            // Compute where we need to write the text nicely
            this.m_CurrentXPosition = CTOS.Globals.m_Canvas.width / 3;
            this.m_CurrentYPosition = innerCircleYPos - ((CTOS.Globals.m_DefaultFontSize + CTOS.Globals.m_FontHeightMargin) * 6);

            // Write the error text, preferably within the circle
            CTOS.CanvasTextFunctions.Enable(CTOS.Globals.m_DrawingContext, "white"); // Set the text to white, maybe a simple way to do this?
            this.PutText(errorType);
            this.AdvanceLine();
            this.m_CurrentXPosition = CTOS.Globals.m_Canvas.width / 5;
            this.PutText(msg);
            CTOS.CanvasTextFunctions.Enable(CTOS.Globals.m_DrawingContext, "black"); // Set text back to black, just in case we write more later perhaps.
        };

        Console.prototype.AdvanceLine = function () {
            this.m_CurrentXPosition = 0;
            this.m_CurrentYPosition += CTOS.Globals.m_DefaultFontSize + CTOS.Globals.m_FontHeightMargin;

            // Auto-Scroll in the Y
            if (this.m_CurrentYPosition > CTOS.Globals.m_Canvas.height) {
                // Get the entire console we previously had as an image
                var canvasImage = CTOS.Globals.m_DrawingContext.getImageData(0, 0, CTOS.Globals.m_Canvas.width, CTOS.Globals.m_Canvas.height);

                // Increase the heigh and put the image above
                CTOS.Globals.m_Canvas.height += CTOS.Globals.m_DefaultFontSize + CTOS.Globals.m_FontHeightMargin;
                CTOS.Globals.m_DrawingContext.putImageData(canvasImage, 0, 0);

                // Auto-scroll down
                var elem = document.getElementById('divConsole');
                elem.scrollTop = elem.scrollHeight;
            }
        };
        return Console;
    })();
    CTOS.Console = Console;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=console.js.map
