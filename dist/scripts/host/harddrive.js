/**
Hard Drive
Uses HTML5 local storage to access and modify data using Track-Sector-Block.
The device driver will handle conversions to and from TSB, similar to memoryManager.
001-077 = dir data
100-377 = data
0/1 - @@@ - filename or data
in use bit - next TSB or @ invalid - data string from 4 bytes to 63
Need 5 TSBs for a single swap file, aprox 15 available from TSB 302
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
            localStorage.setItem("000", "1@@@001100302ctOS MBR");
            for (var i = 1; i < 378; ++i) {
                var tsb = "";
                if (i < 10) {
                    tsb += "00" + i.toString();
                } else if (i >= 10 && i < 100) {
                    tsb += "0" + i.toString();
                } else {
                    tsb += i.toString();
                }
                localStorage.setItem(tsb, "0@@@00000000000000000000000000000000000000000000000000000000000");
            }
        };

        HardDrive.prototype.SetTSB = function (tsb, data) {
            if (tsb == "000") {
                // Should maybe IRQ? Dont write here.
            } else {
                localStorage.setItem(tsb, data);
            }
        };

        HardDrive.prototype.GetTSB = function (tsb) {
            return localStorage.getItem(tsb);
        };

        HardDrive.prototype.SetNextAvailableDir = function (tsb) {
            var mbr = localStorage.getItem("000");
            mbr[4] = tsb[0];
            mbr[5] = tsb[1];
            mbr[6] = tsb[2];
            localStorage.setItem("000", mbr);
        };

        HardDrive.prototype.GetNextAvailableDir = function () {
            var mbr = localStorage.getItem("000");
            return mbr.substr(4, 7);
        };

        HardDrive.prototype.SetNextAvailableData = function (tsb) {
            var mbr = localStorage.getItem("000");
            mbr[7] = tsb[0];
            mbr[8] = tsb[1];
            mbr[9] = tsb[2];
            localStorage.setItem("000", mbr);
        };

        HardDrive.prototype.GetNextAvailableData = function () {
            var mbr = localStorage.getItem("000");
            return mbr.substr(7, 10);
        };

        HardDrive.prototype.SetNextAvailableSwap = function (tsb) {
            var mbr = localStorage.getItem("000");
            mbr[10] = tsb[0];
            mbr[11] = tsb[1];
            mbr[12] = tsb[2];
            localStorage.setItem("000", mbr);
        };

        HardDrive.prototype.GetNextAvailableSwap = function () {
            var mbr = localStorage.getItem("000");
            return mbr.substr(10, 13);
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
//# sourceMappingURL=hardDrive.js.map
