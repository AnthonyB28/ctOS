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
        function Console(m_CurrentFont, m_CurrentFontSize, m_CurrentXPosition, m_CurrentYPosition, m_Buffer, m_CmdHistory, m_CmdHistoryIndex, m_CmdHistoryMovedOnce) {
            if (typeof m_CurrentFont === "undefined") { m_CurrentFont = _DefaultFontFamily; }
            if (typeof m_CurrentFontSize === "undefined") { m_CurrentFontSize = _DefaultFontSize; }
            if (typeof m_CurrentXPosition === "undefined") { m_CurrentXPosition = 0; }
            if (typeof m_CurrentYPosition === "undefined") { m_CurrentYPosition = _DefaultFontSize; }
            if (typeof m_Buffer === "undefined") { m_Buffer = ""; }
            if (typeof m_CmdHistory === "undefined") { m_CmdHistory = []; }
            if (typeof m_CmdHistoryIndex === "undefined") { m_CmdHistoryIndex = 0; }
            if (typeof m_CmdHistoryMovedOnce === "undefined") { m_CmdHistoryMovedOnce = false; }
            this.m_CurrentFont = m_CurrentFont;
            this.m_CurrentFontSize = m_CurrentFontSize;
            this.m_CurrentXPosition = m_CurrentXPosition;
            this.m_CurrentYPosition = m_CurrentYPosition;
            this.m_Buffer = m_Buffer;
            this.m_CmdHistory = m_CmdHistory;
            this.m_CmdHistoryIndex = m_CmdHistoryIndex;
            this.m_CmdHistoryMovedOnce = m_CmdHistoryMovedOnce;
        }
        Console.prototype.init = function () {
            this.clearScreen();
            this.resetXY();
        };

        Console.prototype.clearScreen = function () {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        };

        Console.prototype.resetXY = function () {
            this.m_CurrentXPosition = 0;
            this.m_CurrentYPosition = this.m_CurrentFontSize + _FontHeightMargin;
        };

        Console.prototype.handleInput = function () {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();

                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) {
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.m_Buffer);

                    // ... and reset our buffer.
                    if (this.m_CmdHistory.length > MAX_COMMAND_HISTORY) {
                        this.m_CmdHistory.shift();
                    }
                    this.m_CmdHistory.push(this.m_Buffer);
                    this.m_CmdHistoryIndex = this.m_CmdHistory.length - 1;
                    this.m_Buffer = "";
                } else if (chr === String.fromCharCode(8) && this.m_Buffer.length > 0) {
                    //this.eraseLastCharacter();
                    this.putError("test", "ERROR TESTING");
                } else if ((chr == String.fromCharCode(9) || chr == String.fromCharCode(39)) && this.m_Buffer.length > 0) {
                    var suggestedCmd = _OsShell.suggestCmd(this.m_Buffer);
                    if (suggestedCmd != "") {
                        this.eraseLine();
                        this.putText(suggestedCmd);
                        this.m_Buffer = suggestedCmd;
                    }
                } else if (chr == String.fromCharCode(38) && this.m_CmdHistory.length > 0) {
                    this.CmdHistoryLookup(true);
                } else if (chr == String.fromCharCode(40) && this.m_CmdHistory.length > 0) {
                    this.CmdHistoryLookup(false);
                } else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);

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
                    // Make sure we've moved before, otherwise we skip an index
                    if (this.m_CmdHistoryMovedOnce) {
                        ++this.m_CmdHistoryIndex;
                    }
                }
            }

            this.eraseLine();
            var cmd = this.m_CmdHistory[this.m_CmdHistoryIndex];
            this.putText(cmd);
            this.m_Buffer = cmd;
            this.m_CmdHistoryMovedOnce = true;
        };

        // Removes the entire buffer from the canvas and clears itself
        Console.prototype.eraseLine = function () {
            var offset = _DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_Buffer);
            var xBeginningPos = this.m_CurrentXPosition - offset;
            var yBeginningPos = this.m_CurrentYPosition + 1 - this.m_CurrentFontSize;
            _DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.m_CurrentXPosition, this.m_CurrentYPosition);
            this.m_CurrentXPosition = xBeginningPos;

            // Clear buffer, important
            this.m_Buffer = "";
        };

        // Removes the last character on the buffer from the canvas & the buffer itself
        Console.prototype.eraseLastCharacter = function () {
            var offset = _DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_Buffer.slice(-1));
            var xBeginningPos = this.m_CurrentXPosition - offset;
            var yBeginningPos = this.m_CurrentYPosition + 1 - this.m_CurrentFontSize;
            _DrawingContext.clearRect(xBeginningPos, yBeginningPos, this.m_CurrentXPosition, this.m_CurrentYPosition);
            this.m_CurrentXPosition = xBeginningPos;

            // Strip last character off the buffer
            this.m_Buffer = this.m_Buffer.substr(0, this.m_Buffer.length - 1);
        };

        Console.prototype.putText = function (text) {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            if (text !== "") {
                var offset = _DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, text);
                var isMultiLineWrapped = false;

                // If our position is over the width, we need to line wrap!
                if ((this.m_CurrentXPosition + offset) > _Canvas.width) {
                    if (text.length > 1) {
                        // We have long text to break up. Need to find which index to substring
                        var indexToLineBreak = this.findLineWrapPosition(text);
                        var textLineBeginning = text.substring(0, indexToLineBreak);
                        _DrawingContext.drawText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_CurrentXPosition, this.m_CurrentYPosition, textLineBeginning);
                        this.advanceLine();
                        isMultiLineWrapped = true;
                        this.putText(text.substring(indexToLineBreak, text.length));
                    } else {
                        // We have only a single character to put on the canvas. Just advance line and write it as if normal.
                        this.advanceLine();
                    }
                }

                // As long as we didn't do any recursive huge line wrap just before this, simply write the text.
                if (!isMultiLineWrapped) {
                    // Draw the text at the current X and Y coordinates.
                    _DrawingContext.drawText(this.m_CurrentFont, this.m_CurrentFontSize, this.m_CurrentXPosition, this.m_CurrentYPosition, text);
                }

                // Move the current X position.
                this.m_CurrentXPosition = this.m_CurrentXPosition + offset;
            }
        };

        // Finds the index of a string which needs to wrap
        Console.prototype.findLineWrapPosition = function (text) {
            var offsetToLineBreak = 0;
            for (var i = 0; i < text.length; ++i) {
                // Measure each character until we breach the Canvas width
                offsetToLineBreak += _DrawingContext.measureText(this.m_CurrentFont, this.m_CurrentFontSize, text[i]);
                if (offsetToLineBreak > _Canvas.width) {
                    return i;
                }
            }
            return 0;
        };

        Console.prototype.putError = function (errorType, msg) {
            var color = '#236B8E';

            var yOffset = 30;
            var height = _Canvas.height;
            var innerCircleYPos = this.m_CurrentYPosition + ((_DefaultFontSize + _FontHeightMargin) * (yOffset / 2));
            this.advanceLine();
            var grd = _DrawingContext.createRadialGradient(_Canvas.width / 2, innerCircleYPos, 180, _Canvas.width / 2, innerCircleYPos, 250);
            grd.addColorStop(0, color);
            grd.addColorStop(1, "#DFDBC3");

            // Fill with gradient
            _DrawingContext.fillStyle = grd;
            _DrawingContext.fillRect(this.m_CurrentXPosition, this.m_CurrentYPosition, _Canvas.width, height);
            this.m_CurrentXPosition = _Canvas.width / 3;
            this.m_CurrentYPosition = innerCircleYPos - ((_DefaultFontSize + _FontHeightMargin) * 6);
            this.putText("ERROR TRAP:");
            this.advanceLine();
            this.m_CurrentXPosition = _Canvas.width / 5;
            this.putText("Interrupt Request.irq = "); // TODO white
            this.m_CurrentXPosition = 0;
            this.m_CurrentYPosition = height; // TODO Do we stop input?
        };

        Console.prototype.advanceLine = function () {
            this.m_CurrentXPosition = 0;
            this.m_CurrentYPosition += _DefaultFontSize + _FontHeightMargin;

            // Auto-Scroll in the Y
            if (this.m_CurrentYPosition > _Canvas.height) {
                // Get the entire console we previously had as an image
                var canvasImage = _DrawingContext.getImageData(0, 0, _Canvas.width, _Canvas.height);

                // Increase the heigh and put the image above
                _Canvas.height += _DefaultFontSize + _FontHeightMargin;
                _DrawingContext.putImageData(canvasImage, 0, 0);

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
