/**
Hard Drive
Uses HTML5 local storage to access and modify data using Track-Sector-Block.
The device driver will handle conversions to and from TSB, similar to memoryManager.
DO NOT ACCESS DIRECTLY - use the deviceDriverHardDrive instead. This is important.
001-077 = dir data
100-377 = data
0/1 - @@@ - filename or data
in use bit - next TSB or @ invalid - data string from 4 bytes to 63
**/
var CTOS;
(function (CTOS) {
    var HardDrive = (function () {
        function HardDrive() {
            if (this.IsSupported()) {
                HardDrive.Supported = true;
            } else {
                HardDrive.Supported = false;
            }
        }
        // Write data to tsb in HTML5 storage
        HardDrive.prototype.SetTSB = function (tsb, data) {
            if (this.IsSupported()) {
                ++HardDrive.Writes;
                localStorage.setItem(tsb, data);
            }
        };

        // Returns the TSB from HTML5 storage
        HardDrive.prototype.GetTSB = function (tsb) {
            if (this.IsSupported()) {
                ++HardDrive.Reads;
                return localStorage.getItem(tsb);
            }
            return null;
        };

        // Check if HTML5 is supported via Modernizr
        HardDrive.prototype.IsSupported = function () {
            if (Modernizr.localstorage) {
                return true;
            } else {
                return false;
            }
        };
        HardDrive.Supported = false;
        HardDrive.Writes = 0;
        HardDrive.Reads = 0;
        return HardDrive;
    })();
    CTOS.HardDrive = HardDrive;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=hardDrive.js.map
