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
        function Console(currentFont, currentFontSize, currentXPosition, currentYPosition, buffer, cmdHistory, cmdHistoryIndex, cmdHistoryMovedOnce) {
            if (typeof currentFont === "undefined") { currentFont = _DefaultFontFamily; }
            if (typeof currentFontSize === "undefined") { currentFontSize = _DefaultFontSize; }
            if (typeof currentXPosition === "undefined") { currentXPosition = 0; }
            if (typeof currentYPosition === "undefined") { currentYPosition = _DefaultFontSize; }
            if (typeof buffer === "undefined") { buffer = ""; }
            if (typeof cmdHistory === "undefined") { cmdHistory = []; }
            if (typeof cmdHistoryIndex === "undefined") { cmdHistoryIndex = 0; }
            if (typeof cmdHistoryMovedOnce === "undefined") { cmdHistoryMovedOnce = false; }
            this.currentFont = currentFont;
            this.currentFontSize = currentFontSize;
            this.currentXPosition = currentXPosition;
            this.currentYPosition = currentYPosition;
            this.buffer = buffer;
            this.cmdHistory = cmdHistory;
            this.cmdHistoryIndex = cmdHistoryIndex;
            this.cmdHistoryMovedOnce = cmdHistoryMovedOnce;
        }
        Console.prototype.init = function () {
            this.clearScreen();
            this.resetXY();
        };

        Console.prototype.clearScreen = function () {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        };

        Console.prototype.resetXY = function () {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize + _FontHeightMargin;
        };

        Console.prototype.handleInput = function () {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();

                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) {
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);

                    // ... and reset our buffer.
                    if (this.cmdHistory.length > MAX_COMMAND_HISTORY) {
                        this.cmdHistory.shift();
                    }
                    this.cmdHistory.push(this.buffer);
                    this.cmdHistoryIndex = this.cmdHistory.length - 1;
                    this.buffer = "";
                } else if (chr === String.fromCharCode(8) && this.buffer.length > 0) {
                    this.eraseLastCharacter();
                } else if (chr == String.fromCharCode(9) && this.buffer.length > 0) {
                    var suggestedCmd = _OsShell.handleTab(this.buffer);
                    if (suggestedCmd != "") {
                        this.eraseLine();
                        this.putText(suggestedCmd);
                        this.buffer = suggestedCmd;
                    }
                } else if (chr == String.fromCharCode(38) && this.cmdHistory.length > 0) {
                    this.CmdHistoryLookup(true);
                } else if (chr == String.fromCharCode(40) && this.cmdHistory.length > 0) {
                    this.CmdHistoryLookup(false);
                } else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);

                    // ... and add it to our buffer.
                    this.buffer += chr;
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
                if (this.cmdHistoryIndex != 0) {
                    // Make sure we've moved before, otherwise we'll skip an index
                    if (this.cmdHistoryMovedOnce) {
                        --this.cmdHistoryIndex;
                    }
                }
            } else {
                // Don't go out of bounds
                if (this.cmdHistoryIndex != this.cmdHistory.length - 1) {
                    // Make sure we've moved before, otherwise we skip an index
                    if (this.cmdHistoryMovedOnce) {
                        ++this.cmdHistoryIndex;
                    }
                }
            }

            this.eraseLine();
            var cmd = this.cmdHistory[this.cmdHistoryIndex];
            this.putText(cmd);
            this.buffer = cmd;

            this.cmdHistoryMovedOnce = true;
        };

        // Removes the entire buffer from the canvas and clears itself
        Console.prototype.eraseLine = function () {
            var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer);
            var xBeginningPos = this.currentXPosition - offset;
            var yBeginningPos = this.currentYPosition + 1 - this.currentFontSize;
            _DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.currentXPosition, this.currentYPosition);
            this.currentXPosition = xBeginningPos;

            // Clear buffer, important
            this.buffer = "";
        };

        // Removes the last character on the buffer from the canvas & the buffer itself
        Console.prototype.eraseLastCharacter = function () {
            var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.slice(-1));
            var xBeginningPos = this.currentXPosition - offset;
            var yBeginningPos = this.currentYPosition + 1 - this.currentFontSize;
            _DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.currentXPosition, this.currentYPosition);
            this.currentXPosition = xBeginningPos;

            // Strip last character off the buffer
            this.buffer = this.buffer.substr(0, this.buffer.length - 1);
        };

        Console.prototype.putText = function (text) {
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
        };

        Console.prototype.advanceLine = function () {
            this.currentXPosition = 0;
            this.currentYPosition += _DefaultFontSize + _FontHeightMargin;
            // TODO: Handle scrolling. (Project 1)
        };
        return Console;
    })();
    CTOS.Console = Console;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=console.js.map
