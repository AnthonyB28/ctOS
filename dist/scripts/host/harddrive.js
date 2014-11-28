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
                localStorage.setItem(tsb, HardDrive.INIT_TSB);
            }
        };

        HardDrive.prototype.SetTSB = function (tsb, data) {
            if (tsb == "000") {
                // Should maybe IRQ? Dont write here.
            } else {
                localStorage.setItem(tsb, data);
            }
        };

        HardDrive.prototype.ResetTSB = function (tsb) {
            localStorage.setItem(tsb, HardDrive.INIT_TSB);
        };

        HardDrive.prototype.GetTSB = function (tsb) {
            if (tsb != "@@@") {
                return localStorage.getItem(tsb);
            } else {
                CTOS.Globals.m_OsShell.PutTextLine("Hard Drive tried to get @@@ TSB");
                return null;
            }
        };

        HardDrive.prototype.SetNextAvailableDir = function (tsb) {
            var mbr = localStorage.getItem("000");
            var newMbr = mbr.substr(0, 4) + tsb + mbr.substr(7, mbr.length);
            localStorage.setItem("000", newMbr);
        };

        HardDrive.prototype.GetNextAvailableDir = function () {
            var mbr = localStorage.getItem("000");
            return mbr.substr(4, 3);
        };

        HardDrive.prototype.SetNextAvailableData = function (tsb) {
            var mbr = localStorage.getItem("000");
            var newMbr = mbr.substr(0, 7) + tsb + mbr.substr(10, mbr.length);
            localStorage.setItem("000", newMbr);
        };

        HardDrive.prototype.GetNextAvailableData = function () {
            var mbr = localStorage.getItem("000");
            return mbr.substr(7, 3);
        };

        HardDrive.prototype.SetNextAvailableSwap = function (tsb) {
            var mbr = localStorage.getItem("000");
            var newMbr = mbr.substr(0, 10) + tsb + mbr.substr(13, mbr.length);
            localStorage.setItem("000", newMbr);
        };

        HardDrive.prototype.GetNextAvailableSwap = function () {
            var mbr = localStorage.getItem("000");
            return mbr.substr(10, 3);
        };

        HardDrive.prototype.IsSupported = function () {
            if (Modernizr.localstorage) {
                return true;
            } else {
                return false;
            }
        };
        HardDrive.Supported = false;
        HardDrive.INIT_TSB = "0@@@00000000000000000000000000000000000000000000000000000000000";
        return HardDrive;
    })();
    CTOS.HardDrive = HardDrive;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=hardDrive.js.map
