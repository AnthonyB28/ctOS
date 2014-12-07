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

                // May want to check storage size before continuing
                this.Init();
            } else {
                HardDrive.Supported = false;
            }
        }
        // Sets all TSBs to default and setups the MBR at 000
        HardDrive.prototype.Init = function () {
            if (this.IsSupported()) {
                localStorage.setItem("000", "1" + CTOS.DeviceDriverHardDrive.TSB_INVALID + "001100ctOS MBR");
                for (var i = 1; i < 572; ++i) {
                    var baseEight = parseInt(i.toString(8), 10);
                    var tsb = "";
                    if (baseEight <= 7) {
                        tsb += "00" + baseEight.toString();
                    } else if (baseEight >= 10 && baseEight < 100) {
                        tsb += "0" + baseEight.toString();
                    } else {
                        tsb += baseEight.toString();
                    }

                    localStorage.setItem(tsb, CTOS.DeviceDriverHardDrive.TSB_INIT);
                }
            }
        };

        // Write data to tsb in HTML5 storage
        HardDrive.prototype.SetTSB = function (tsb, data) {
            if (this.IsSupported()) {
                localStorage.setItem(tsb, data);
            }
        };

        // Returns the TSB from HTML5 storage
        HardDrive.prototype.GetTSB = function (tsb) {
            if (this.IsSupported()) {
                if (tsb != CTOS.DeviceDriverHardDrive.TSB_INVALID) {
                    return localStorage.getItem(tsb);
                } else {
                    CTOS.Globals.m_OsShell.PutTextLine("Hard Drive tried to get " + CTOS.DeviceDriverHardDrive.TSB_INVALID + " TSB");
                    return null;
                }
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
        return HardDrive;
    })();
    CTOS.HardDrive = HardDrive;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=harddrive.js.map
