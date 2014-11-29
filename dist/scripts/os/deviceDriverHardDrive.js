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
            this.Init();
        }
        DeviceDriverHardDrive.prototype.Init = function () {
            CTOS.Control.HardDriveTableInit();
            this.m_AvailableDir = new Array();
            for (var i = 1; i < 64; ++i) {
                var tsb = "";
                var baseEight = parseInt(i.toString(8), 10);
                if (i <= 7) {
                    tsb += "00" + baseEight.toString();
                } else {
                    tsb += "0" + baseEight.toString();
                }
                this.m_AvailableDir[tsb] = 0;
            }
            this.m_AvailableData = new Array();
            for (var i = 64; i < 256; ++i) {
                var baseEight = parseInt(i.toString(8), 10);
                this.m_AvailableData[baseEight.toString()] = 0;
            }
        };

        DeviceDriverHardDrive.prototype.krnHdDriverISR = function (params) {
            switch (params[0]) {
                case DeviceDriverHardDrive.IRQ_FORMAT:
                    this.Format();
                    break;
                case DeviceDriverHardDrive.IRQ_CREATE_FILE:
                    this.CreateFile(params[1]);
                    break;
                case DeviceDriverHardDrive.IRQ_WRITE_DATA:
                    this.WriteData(params[1], params[2]);
                    break;
                case DeviceDriverHardDrive.IRQ_READ_FILE:
                    var fileData = this.ReadFile(params[1]);
                    if (fileData) {
                        CTOS.Globals.m_OsShell.PutTextLine(this.ReadFile(params[1]));
                    }
                    break;
                case DeviceDriverHardDrive.IRQ_DELETE_FILE:
                    this.DeleteFile(params[1]);
                    break;
                case DeviceDriverHardDrive.IRQ_LIST_DISK:
                    this.ListFiles();
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
                CTOS.Globals.m_OsShell.PutTextLine("HTML5 Local Storage not supported");
                return false;
            }
        };

        DeviceDriverHardDrive.prototype.Format = function () {
            if (this.IsSupported()) {
                if (CTOS.Globals.m_KernelReadyQueue.getSize() > 0) {
                    CTOS.Globals.m_OsShell.PutTextLine("Error - programs in ready queue!");
                    return;
                }
                if (CTOS.Globals.m_CPU.m_IsExecuting) {
                    CTOS.Globals.m_OsShell.PutTextLine("Error - programs are running on CPU!");
                    return;
                }

                CTOS.Globals.m_HardDrive = new CTOS.HardDrive();
                this.Init();
            }
        };

        DeviceDriverHardDrive.prototype.CreateFile = function (filename) {
            if (this.IsSupported()) {
                if (filename.length > 60) {
                    CTOS.Globals.m_OsShell.PutTextLine("Error - Filename: " + filename + " is too long.");
                    return;
                }
                if (this.GetDirTSBFromFilename(filename, false)) {
                    CTOS.Globals.m_OsShell.PutTextLine("Error - Filename: " + filename + " already exists.");
                    return;
                }
                var hexString = CTOS.Utils.ConvertToHex(filename);
                var tsbDir = CTOS.Globals.m_HardDrive.GetNextAvailableDir();
                var tsbData = CTOS.Globals.m_HardDrive.GetNextAvailableData();
                if (CTOS.Globals.m_HardDrive.GetTSB(tsbDir)[0] == "0") {
                    if (CTOS.Globals.m_HardDrive.GetTSB(tsbData)[0] == "0") {
                        var fileNameStr = "1" + tsbData + hexString;
                        this.SetTSB(tsbDir, fileNameStr);
                        this.SetTSB(tsbData, "1@@@");
                        this.m_AvailableDir[tsbDir] = 1;
                        this.m_AvailableData[tsbData] = 1;
                        var nextDir = this.ProbeNextAvailableDir();
                        var nextData = this.ProbeNextAvailableData();
                        CTOS.Control.HardDriveMBRUpdate(CTOS.Globals.m_HardDrive.SetNextAvailableDir(this.ConvertIntegerToTSB(nextDir)));
                        CTOS.Control.HardDriveMBRUpdate(CTOS.Globals.m_HardDrive.SetNextAvailableData(this.ConvertIntegerToTSB(nextData)));
                        CTOS.Globals.m_OsShell.PutTextLine("Success - filename TSB " + tsbDir + " data TSB " + tsbData);
                    } else {
                        CTOS.Globals.m_OsShell.PutTextLine("Error - TSB" + tsbData + " data not avail");
                    }
                } else {
                    CTOS.Globals.m_OsShell.PutTextLine("Error - TSB" + tsbDir + " dir not avail");
                }
            }
        };

        DeviceDriverHardDrive.prototype.DeleteFile = function (file) {
            if (this.IsSupported()) {
                var dirTSB = this.GetDirTSBFromFilename(file);
                if (!dirTSB) {
                    return;
                }
                var dataTSB = CTOS.Globals.m_HardDrive.GetTSB(dirTSB).substr(1, 3);
                this.m_AvailableDir[dirTSB] = 0;
                CTOS.Control.HardDriveMBRUpdate(CTOS.Globals.m_HardDrive.SetNextAvailableDir(dirTSB));
                this.ResetTSB(dirTSB);
                this.DeleteDataTSB(dataTSB);
                CTOS.Globals.m_OsShell.PutTextLine("Success");
            }
        };

        DeviceDriverHardDrive.prototype.ReadFile = function (file) {
            if (this.IsSupported()) {
                var fileTSB = this.GetDirTSBFromFilename(file);
                if (fileTSB) {
                    var firstDataTSB = CTOS.Globals.m_HardDrive.GetTSB(fileTSB).substr(1, 3);
                    if (firstDataTSB) {
                        var hexData = "";
                        var data = "";
                        var dataTSB = firstDataTSB;
                        do {
                            hexData = CTOS.Globals.m_HardDrive.GetTSB(dataTSB);
                            dataTSB = hexData.substr(1, 3);
                            data += CTOS.Utils.ConvertHexToString(hexData.substr(4, hexData.length - 4));
                        } while(dataTSB != "@@@");
                    }

                    return data;
                }
            }

            return null;
        };

        DeviceDriverHardDrive.prototype.WriteData = function (file, data) {
            if (this.IsSupported()) {
                var fileTSB = this.GetDirTSBFromFilename(file);
                if (fileTSB) {
                    var firstDataTSB = CTOS.Globals.m_HardDrive.GetTSB(fileTSB).substring(1, 4);
                    if (firstDataTSB) {
                        var tsbNeededToFill = Math.ceil(data.length / 59);
                        var hexDataToWrite = CTOS.Utils.ConvertToHex(data);
                        if (tsbNeededToFill == 1) {
                            this.SetTSB(firstDataTSB, "1@@@" + hexDataToWrite);
                        } else {
                            this.DeleteDataTSB(firstDataTSB); // Make sure to reset the data chain, if needed
                            var curDataTSB = firstDataTSB;
                            var nextAvailDataTSB = CTOS.Globals.m_HardDrive.GetNextAvailableData();
                            this.m_AvailableData[curDataTSB] = 1;

                            for (var i = 0; i < tsbNeededToFill; ++i) {
                                var startIndex = i * (118);
                                var endIndex = i + 117;
                                this.SetTSB(curDataTSB, "1" + nextAvailDataTSB + hexDataToWrite.substr(startIndex, endIndex));
                                this.m_AvailableData[nextAvailDataTSB] = 1; // Flag next TSB as in use for next loop
                                curDataTSB = nextAvailDataTSB;
                                nextAvailDataTSB = this.ProbeNextAvailableData().toString();
                            }
                            CTOS.Control.HardDriveMBRUpdate(CTOS.Globals.m_HardDrive.SetNextAvailableData(nextAvailDataTSB));
                        }
                        CTOS.Globals.m_OsShell.PutTextLine("Success writing data");
                    }
                }
            }
        };

        DeviceDriverHardDrive.prototype.DeleteDataTSB = function (tsb) {
            var nextTSB = "";
            while (nextTSB != "@@@") {
                this.m_AvailableData[tsb] = 0;
                nextTSB = CTOS.Globals.m_HardDrive.GetTSB(tsb).substr(1, 3);
                this.ResetTSB(tsb);
                tsb = nextTSB;
            }
        };

        DeviceDriverHardDrive.prototype.ListFiles = function () {
            var numberOfFiles = 0;
            for (var i = 1; i < 64; ++i) {
                var tsb = "";
                if (i <= 7) {
                    var baseEight = parseInt(i.toString(8), 10);
                    tsb += "00" + baseEight.toString();
                } else {
                    var baseEight = parseInt(i.toString(8), 10);
                    tsb += "0" + baseEight.toString();
                }
                var dirData = CTOS.Globals.m_HardDrive.GetTSB(tsb);
                if (dirData[0] == "1") {
                    CTOS.Globals.m_OsShell.PutTextLine(CTOS.Utils.ConvertHexToString(dirData.substr(4, dirData.length - 4)));
                    ++numberOfFiles;
                }
            }

            CTOS.Globals.m_OsShell.PutTextLine("# of files: " + numberOfFiles.toString());
        };

        DeviceDriverHardDrive.prototype.GetDirTSBFromFilename = function (file, error) {
            if (typeof error === "undefined") { error = true; }
            for (var i = 1; i < 64; ++i) {
                var tsb = "";
                if (i <= 7) {
                    var baseEight = parseInt(i.toString(8), 10);
                    tsb += "00" + baseEight.toString();
                } else {
                    var baseEight = parseInt(i.toString(8), 10);
                    tsb += "0" + baseEight.toString();
                }
                var dirData = CTOS.Globals.m_HardDrive.GetTSB(tsb);
                if (dirData[0] == "1") {
                    var fileName = CTOS.Utils.ConvertHexToString(dirData.substr(4, dirData.length - 4)).replace(/\0/g, '');

                    if (fileName == file) {
                        return tsb;
                    }
                }
            }
            if (error) {
                CTOS.Globals.m_OsShell.PutTextLine("Filename doesn't exist.");
            }
            return null;
        };

        DeviceDriverHardDrive.prototype.ConvertIntegerToTSB = function (i) {
            if (i <= 7) {
                return "00" + i.toString();
            } else if (i >= 10 && i < 100) {
                return "0" + i.toString();
            } else {
                return i.toString();
            }
        };

        DeviceDriverHardDrive.prototype.SetTSB = function (tsb, data) {
            data = data.toLocaleUpperCase();
            for (var i = data.length; i < 124; ++i) {
                data += "0";
            }
            CTOS.Globals.m_HardDrive.SetTSB(tsb, data);
            CTOS.Control.HardDriveTableUpdate(tsb, data);
        };

        DeviceDriverHardDrive.prototype.ResetTSB = function (tsb) {
            this.SetTSB(tsb, CTOS.HardDrive.INIT_TSB);
        };

        DeviceDriverHardDrive.prototype.ProbeNextAvailableDir = function () {
            for (var i = 1; i < 64; ++i) {
                var tsb = "";
                if (i <= 7) {
                    var baseEight = parseInt(i.toString(8), 10);
                    tsb += "00" + baseEight.toString();
                } else {
                    var baseEight = parseInt(i.toString(8), 10);
                    tsb += "0" + baseEight.toString();
                }
                if (this.m_AvailableDir[tsb] == 0) {
                    return baseEight;
                }
            }
        };

        DeviceDriverHardDrive.prototype.ProbeNextAvailableData = function () {
            for (var i = 64; i < 256; ++i) {
                var baseEight = parseInt(i.toString(8), 10);
                if (this.m_AvailableData[baseEight.toString()] == 0) {
                    return baseEight;
                }
            }
        };
        DeviceDriverHardDrive.IRQ_FORMAT = 0;
        DeviceDriverHardDrive.IRQ_CREATE_FILE = 1;
        DeviceDriverHardDrive.IRQ_CREATE_FILE_DATA = 2;
        DeviceDriverHardDrive.IRQ_WRITE_DATA = 3;
        DeviceDriverHardDrive.IRQ_READ_FILE = 4;
        DeviceDriverHardDrive.IRQ_DELETE_FILE = 5;
        DeviceDriverHardDrive.IRQ_LIST_DISK = 6;
        return DeviceDriverHardDrive;
    })(CTOS.DeviceDriver);
    CTOS.DeviceDriverHardDrive = DeviceDriverHardDrive;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=deviceDriverHardDrive.js.map
