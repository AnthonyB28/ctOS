/**
Hard Drive
Uses HTML5 local storage to access and modify data using Track-Sector-Block.
The device driver will handle conversions to and from TSB, similar to memoryManager.
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
        HardDrive.prototype.Init = function () {
        };

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
