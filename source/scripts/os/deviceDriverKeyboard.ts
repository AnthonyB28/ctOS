///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module CTOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            // Override the base method pointers.
            super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
        }

        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public krnKbdDispatchKeyPress(params) {
            // Parse the params.    TODO: Check that they are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            Globals.m_Kernel.Trace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";

            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
                ((keyCode >= 97) && (keyCode <= 123))) 
            {
                // Determine the character we want to display.
                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) 
                {
                    chr = String.fromCharCode(keyCode);
                }
                else
                {
                    chr = String.fromCharCode(keyCode + 32);
                }

                // TODO: Check for caps-lock and handle as shifted if so.
                Globals.m_KernelInputQueue.enqueue(chr);
            }

            else if (((keyCode >= 48) && (keyCode <= 57)) ||   // digits
                (keyCode == 32) ||   // space
                (keyCode == 13))     // enter
            {
                if (isShifted)
                {
                    var shiftedNumbers = {
                        49: "!", 50: "@", 51: "#", 52: "$", 53: "%", 54: "^", 55: "&", 56: "*", 57: "(", 48: ")"
                    };

                    chr = shiftedNumbers[keyCode];

                    if (!chr)
                    {
                        chr = "";
                    }
                }

                else
                {
                    chr = String.fromCharCode(keyCode);
                }

                Globals.m_KernelInputQueue.enqueue(chr);
            }

            // Symbol keys
            else if ((keyCode >= 186) && (keyCode <= 222))
            {

                if (isShifted)
                {
                    var shiftedSymbols = {
                        186: ":", 187: "+", 188: "<", 189: "_", 190: ">", 191: "?", 192: "~", 219: "{", 221: "}", 220: "|", 222: "\""
                    };
                    chr = shiftedSymbols[keyCode];
                }
                else
                {
                    var symbolKeys = {
                        186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"
                    };
                    chr = symbolKeys[keyCode];
                }

                if (!chr)
                {
                    chr = "";
                }

                Globals.m_KernelInputQueue.enqueue(chr);
            }

            else if (keyCode == 8 || // backspace
                     keyCode == 9 || // tab
                    (keyCode >= 38 && keyCode <= 40)) // arrows
            {
                chr = String.fromCharCode(keyCode);
                Globals.m_KernelInputQueue.enqueue(chr);
            }
        }
    }
}
