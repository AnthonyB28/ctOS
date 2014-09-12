///<reference path="deviceDriver.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* ----------------------------------
DeviceDriverKeyboard.ts
Requires deviceDriver.ts
The Kernel Keyboard Device Driver.
---------------------------------- */
var CTOS;
(function (CTOS) {
    // Extends DeviceDriver
    var DeviceDriverKeyboard = (function (_super) {
        __extends(DeviceDriverKeyboard, _super);
        function DeviceDriverKeyboard() {
            // Override the base method pointers.
            _super.call(this, this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
        }
        DeviceDriverKeyboard.prototype.krnKbdDriverEntry = function () {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        };

        DeviceDriverKeyboard.prototype.krnKbdDispatchKeyPress = function (params) {
            // Parse the params.    TODO: Check that they are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";

            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) || ((keyCode >= 97) && (keyCode <= 123))) {
                // Determine the character we want to display.
                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);
                } else {
                    chr = String.fromCharCode(keyCode + 32);
                }

                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            } else if (((keyCode >= 48) && (keyCode <= 57)) || (keyCode == 32) || (keyCode == 13)) {
                if (isShifted) {
                    var shiftedNumbers = {
                        49: "!", 50: "@", 51: "#", 52: "$", 53: "%", 54: "^", 55: "&", 56: "*", 57: "(", 48: ")"
                    };

                    chr = shiftedNumbers[keyCode];

                    if (!chr) {
                        chr = "";
                    }
                } else {
                    chr = String.fromCharCode(keyCode);
                }

                _KernelInputQueue.enqueue(chr);
            } else if ((keyCode >= 186) && (keyCode <= 222)) {
                if (isShifted) {
                    var shiftedSymbols = {
                        186: ":", 187: "+", 188: "<", 189: "_", 190: ">", 191: "?", 192: "~", 219: "{", 221: "}", 220: "|", 222: "\""
                    };
                    chr = shiftedSymbols[keyCode];
                } else {
                    var symbolKeys = {
                        186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"
                    };
                    chr = symbolKeys[keyCode];
                }

                if (!chr) {
                    chr = "";
                }

                _KernelInputQueue.enqueue(chr);
            } else if (keyCode == 8 || keyCode == 9) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
        };
        return DeviceDriverKeyboard;
    })(CTOS.DeviceDriver);
    CTOS.DeviceDriverKeyboard = DeviceDriverKeyboard;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=deviceDriverKeyboard.js.map
