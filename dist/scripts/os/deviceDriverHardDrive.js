/**
The driver that allows ctOS to interface with the hard drive.
Will handle the conversion and display of TSB information.
**/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CTOS;
(function (CTOS) {
    // Extends DeviceDriver
    var DeviceDriverHardDrive = (function (_super) {
        __extends(DeviceDriverHardDrive, _super);
        function DeviceDriverHardDrive() {
            // Override the base method pointers.
            _super.call(this, this.krnHdDriverEntry, this.krnHdDriverISR);
            this.m_AvailableDir = new Array();
            for (var i = 1; i < 78; ++i) {
                this.m_AvailableDir[i] = 0;
            }
            this.m_AvailableData = new Array();
            for (var i = 100; i < 378; ++i) {
                this.m_AvailableData[i] = 0;
            }
        }
        DeviceDriverHardDrive.prototype.krnHdDriverISR = function (params) {
            switch (params[0]) {
                case DeviceDriverHardDrive.IRQ_FORMAT:
                    this.Format();
                    break;
                case DeviceDriverHardDrive.IRQ_CREATE_FILE:
                    this.CreateFile(params[1]);
                    break;
                case DeviceDriverHardDrive.IRQ_WRITE_DATA:
                    this.CreateData(params[1], params[2]);
                    break;
            }
        };

        DeviceDriverHardDrive.prototype.krnHdDriverEntry = function () {
            if (this.IsSupported) {
                // Initialization routine for this
                this.status = "loaded";
                // More?
            }
        };

        DeviceDriverHardDrive.prototype.IsSupported = function () {
            if (CTOS.HardDrive.Supported) {
                return true;
            } else {
                CTOS.Globals.m_StdOut.PutText("HTML5 Local Storage not supported");
                CTOS.Globals.m_StdOut.AdvanceLine();
                return false;
            }
        };

        DeviceDriverHardDrive.prototype.Format = function () {
            if (this.IsSupported()) {
                // TODO: make sure we're not running programs
                CTOS.Globals.m_HardDrive = new CTOS.HardDrive();
            }
        };

        DeviceDriverHardDrive.prototype.CreateFile = function (filename) {
            if (this.IsSupported()) {
                if (filename.length > 59) {
                    CTOS.Globals.m_StdOut.PutText("Error - Filename: " + filename + " is too long.");
                    CTOS.Globals.m_StdOut.AdvanceLine();
                    return;
                }
                var hexString = CTOS.Utils.ConvertToHex(filename);
                var tsbDir = CTOS.Globals.m_HardDrive.GetNextAvailableDir();
                var tsbData = CTOS.Globals.m_HardDrive.GetNextAvailableData();
                if (CTOS.Globals.m_HardDrive.GetTSB(tsbDir)[0] == "0") {
                    if (CTOS.Globals.m_HardDrive.GetTSB(tsbData)[0] == "0") {
                        var fileNameStr = "1" + tsbData + hexString;
                        CTOS.Globals.m_HardDrive.SetTSB(tsbDir, fileNameStr);
                        CTOS.Globals.m_HardDrive.SetTSB(tsbData, "1@@@");
                        this.m_AvailableDir[parseInt(tsbDir, 10)] = 1;
                        this.m_AvailableData[parseInt(tsbData, 10)] = 1;
                        var nextDir = this.ProbeNextAvailableDir();
                        var nextData = this.ProbeNextAvailableData();
                        CTOS.Globals.m_HardDrive.SetNextAvailableDir(this.ConvertIntegerToTSB(nextDir));
                        CTOS.Globals.m_HardDrive.SetNextAvailableData(this.ConvertIntegerToTSB(nextData));
                        CTOS.Globals.m_StdOut.PutText("Success - filename TSB " + tsbDir);
                        CTOS.Globals.m_StdOut.AdvanceLine();
                    } else {
                        CTOS.Globals.m_StdOut.PutText("Error - TSB" + tsbData + " data not avail");
                        CTOS.Globals.m_StdOut.AdvanceLine();
                    }
                } else {
                    CTOS.Globals.m_StdOut.PutText("Error - TSB" + tsbDir + " dir not avail");
                    CTOS.Globals.m_StdOut.AdvanceLine();
                }
            }
        };

        DeviceDriverHardDrive.prototype.CreateData = function (file, data) {
            if (this.IsSupported()) {
                var dirTSB = this.GetFilenameTSB(file);
                if (dirTSB) {
                    var startingDataTSB = CTOS.Globals.m_HardDrive.GetTSB(dirTSB).substr(1, 3);
                    this.DeleteDataTSB(startingDataTSB); // Make sure to reset the data chain, if needed
                    var tsbNeededToFill = Math.ceil(data.length / 59);
                    var hexDataToWrite = CTOS.Utils.ConvertToHex(data);
                    if (tsbNeededToFill == 1) {
                        CTOS.Globals.m_HardDrive.SetTSB(startingDataTSB, "1@@@" + hexDataToWrite);
                    } else {
                        var curDataTSB = startingDataTSB;
                        var nextAvailDataTSB = CTOS.Globals.m_HardDrive.GetNextAvailableData();

                        for (var i = 0; i < tsbNeededToFill; ++i) {
                            var startIndex = i * (118);
                            var endIndex = i + 118;
                            CTOS.Globals.m_HardDrive.SetTSB(curDataTSB, "1" + nextAvailDataTSB + hexDataToWrite.substr(startIndex, endIndex));
                            this.m_AvailableData[parseInt(curDataTSB, 10)] = 1; // Set this data TSB to in use
                            curDataTSB = nextAvailDataTSB;
                            nextAvailDataTSB = this.ProbeNextAvailableData().toString();
                            CTOS.Globals.m_StdOut.PutText(hexDataToWrite.substr(startIndex, endIndex) + " written to " + curDataTSB);
                            CTOS.Globals.m_StdOut.AdvanceLine();
                        }
                        CTOS.Globals.m_HardDrive.SetNextAvailableData(nextAvailDataTSB);
                    }
                    CTOS.Globals.m_StdOut.PutText("Success writing data");
                    CTOS.Globals.m_StdOut.AdvanceLine();
                }
            }
        };

        DeviceDriverHardDrive.prototype.DeleteDataTSB = function (tsb) {
            while (tsb != "@@@") {
                this.m_AvailableData[parseInt(tsb, 10)] = 0;
                tsb = CTOS.Globals.m_HardDrive.GetTSB(tsb).substr(1, 3);
                CTOS.Globals.m_HardDrive.ResetTSB(tsb);
            }
        };

        DeviceDriverHardDrive.prototype.GetFilenameTSB = function (file) {
            for (var i = 1; i < 77; ++i) {
                var tsb = "";
                if (i < 10) {
                    tsb += "00" + i.toString();
                } else {
                    tsb += "0" + i.toString();
                }
                var dirData = CTOS.Globals.m_HardDrive.GetTSB(tsb);
                if (dirData[0] == "1") {
                    var fileName = CTOS.Utils.ConvertHexToString(dirData.substr(4, file.length * 2));
                    if (fileName == file) {
                        return dirData.substr(1, 3);
                    }
                }
            }
            CTOS.Globals.m_StdOut.PutText("Filename doesn't exist.");
            CTOS.Globals.m_StdOut.AdvanceLine();
            return null;
        };

        DeviceDriverHardDrive.prototype.ConvertIntegerToTSB = function (i) {
            if (i < 10) {
                return "00" + i.toString();
            } else if (i >= 10 && i < 100) {
                return "0" + i.toString();
            } else {
                return i.toString();
            }
        };

        DeviceDriverHardDrive.prototype.ProbeNextAvailableDir = function () {
            for (var i = 1; i < 78; ++i) {
                if (this.m_AvailableDir[i] == 0) {
                    return i;
                }
            }
        };

        DeviceDriverHardDrive.prototype.ProbeNextAvailableData = function () {
            for (var i = 100; i < 378; ++i) {
                if (this.m_AvailableData[i] == 0) {
                    return i;
                }
            }
        };
        DeviceDriverHardDrive.IRQ_FORMAT = 0;
        DeviceDriverHardDrive.IRQ_CREATE_FILE = 1;
        DeviceDriverHardDrive.IRQ_CREATE_FILE_DATA = 2;
        DeviceDriverHardDrive.IRQ_WRITE_DATA = 3;
        return DeviceDriverHardDrive;
    })(CTOS.DeviceDriver);
    CTOS.DeviceDriverHardDrive = DeviceDriverHardDrive;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=deviceDriverHardDrive.js.map
