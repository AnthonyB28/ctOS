﻿/**
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
        // Sets the available dictionaries and the display
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

        // Driver interrupt request handling.
        DeviceDriverHardDrive.prototype.krnHdDriverISR = function (params) {
            switch (params[0]) {
                case DeviceDriverHardDrive.IRQ_FORMAT:
                    this.Format();
                    CTOS.Globals.m_Kernel.Trace("Hard drive format request.");
                    break;
                case DeviceDriverHardDrive.IRQ_CREATE_FILE:
                    this.CreateFile(params[1]);
                    CTOS.Globals.m_Kernel.Trace("Hard drive create file request.");
                    break;
                case DeviceDriverHardDrive.IRQ_WRITE_DATA:
                    this.WriteData(params[1], params[2]);
                    CTOS.Globals.m_Kernel.Trace("Hard drive write data request.");
                    break;
                case DeviceDriverHardDrive.IRQ_READ_FILE:
                    var fileData = this.ReadFile(params[1]);
                    CTOS.Globals.m_Kernel.Trace("Hard drive read file request.");
                    if (fileData) {
                        CTOS.Globals.m_OsShell.PutTextLine(this.ReadFile(params[1]));
                    }
                    break;
                case DeviceDriverHardDrive.IRQ_DELETE_FILE:
                    CTOS.Globals.m_Kernel.Trace("Hard drive delete file request");
                    this.DeleteFile(params[1]);
                    break;
                case DeviceDriverHardDrive.IRQ_LIST_DISK:
                    CTOS.Globals.m_Kernel.Trace("Hard drive list files request");
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

        // Check if harddrive functionality is available
        DeviceDriverHardDrive.prototype.IsSupported = function () {
            if (CTOS.HardDrive.Supported) {
                return true;
            } else {
                CTOS.Globals.m_OsShell.PutTextLine("HTML5 Local Storage not supported");
                return false;
            }
        };

        // Format (reinit) the drive without disturbing the CPU/ReadyQ
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

        // Create a new file
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

                // Convert the filename to hex data and find where to store it and initial data
                var hexString = CTOS.Utils.ConvertToHex(filename);
                var tsbDir = CTOS.Globals.m_HardDrive.GetNextAvailableDir();
                var tsbData = CTOS.Globals.m_HardDrive.GetNextAvailableData();

                // As long as the directories are not in use, we can use them.
                if (CTOS.Globals.m_HardDrive.GetTSB(tsbDir)[0] == "0") {
                    if (CTOS.Globals.m_HardDrive.GetTSB(tsbData)[0] == "0") {
                        var fileNameStr = "1" + tsbData + hexString;
                        this.SetTSB(tsbDir, fileNameStr);
                        this.SetTSB(tsbData, "1@@@");

                        // Mark these tsbs as in use
                        this.m_AvailableDir[tsbDir] = 1;
                        this.m_AvailableData[tsbData] = 1;

                        // Get the next tsbs and mark them in the MBR
                        var nextDir = this.ProbeNextAvailableDir();
                        var nextData = this.ProbeNextAvailableData();
                        CTOS.Control.HardDriveMBRUpdate(CTOS.Globals.m_HardDrive.SetNextAvailableDir(this.ConvertBaseEightToTSB(nextDir)));
                        CTOS.Control.HardDriveMBRUpdate(CTOS.Globals.m_HardDrive.SetNextAvailableData(this.ConvertBaseEightToTSB(nextData)));
                        CTOS.Globals.m_OsShell.PutTextLine("Success - filename TSB " + tsbDir + " data TSB " + tsbData);
                    } else {
                        CTOS.Globals.m_OsShell.PutTextLine("Error - TSB" + tsbData + " data not avail");
                    }
                } else {
                    CTOS.Globals.m_OsShell.PutTextLine("Error - TSB" + tsbDir + " dir not avail");
                }
            }
        };

        // Deletes the specified file if available
        DeviceDriverHardDrive.prototype.DeleteFile = function (file) {
            if (this.IsSupported()) {
                // Attempt to get the file TSB data from the drive
                var dirTSB = this.GetDirTSBFromFilename(file);
                if (!dirTSB) {
                    return;
                }
                var dataTSB = CTOS.Globals.m_HardDrive.GetTSB(dirTSB).substr(1, 3);

                // Reset the dir and file data, mark as available
                this.m_AvailableDir[dirTSB] = 0;
                CTOS.Control.HardDriveMBRUpdate(CTOS.Globals.m_HardDrive.SetNextAvailableDir(dirTSB));
                this.ResetTSB(dirTSB);
                this.DeleteDataTSB(dataTSB);
                CTOS.Globals.m_OsShell.PutTextLine("Success");
            }
        };

        // Return the data string from the file provided
        DeviceDriverHardDrive.prototype.ReadFile = function (file) {
            if (this.IsSupported()) {
                // Get the dir TSB if file exists
                var fileTSB = this.GetDirTSBFromFilename(file);
                if (fileTSB) {
                    // Get the data TSB if it exists, loop through converting hex, and return.
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

        // Writes data to a file if available
        DeviceDriverHardDrive.prototype.WriteData = function (file, data) {
            if (this.IsSupported()) {
                // Find if file exists
                var fileTSB = this.GetDirTSBFromFilename(file);
                if (fileTSB) {
                    // Obtain where the start of the data should be if available
                    var firstDataTSB = CTOS.Globals.m_HardDrive.GetTSB(fileTSB).substring(1, 4);
                    if (firstDataTSB) {
                        // Figure out how many TSBs we need, and fill them.
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
                                if (nextAvailDataTSB == "@@@") {
                                    CTOS.Globals.m_OsShell.PutTextLine("Error - Ran out of data! Next TSB not available. Partial written file.");
                                    CTOS.Control.HardDriveMBRUpdate(CTOS.Globals.m_HardDrive.SetNextAvailableData(curDataTSB));
                                    return;
                                }
                            }
                            CTOS.Control.HardDriveMBRUpdate(CTOS.Globals.m_HardDrive.SetNextAvailableData(nextAvailDataTSB));
                        }
                        CTOS.Globals.m_OsShell.PutTextLine("Success writing data");
                    }
                }
            }
        };

        // Resets a data TSB and all of its links, if any
        DeviceDriverHardDrive.prototype.DeleteDataTSB = function (tsb) {
            var nextTSB = "";
            do {
                this.m_AvailableData[tsb] = 0;
                nextTSB = CTOS.Globals.m_HardDrive.GetTSB(tsb).substr(1, 3);
                this.ResetTSB(tsb);
                tsb = nextTSB;
            } while(tsb != "@@@");
        };

        // Lists all filenames
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

        // Returns the whole dir TSB of the file provided, false if no error for not found. Returns null if not found.
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

        // Converts a base 8 number to TSB
        DeviceDriverHardDrive.prototype.ConvertBaseEightToTSB = function (i) {
            if (i <= 7) {
                return "00" + i.toString();
            } else if (i >= 10 && i < 100) {
                return "0" + i.toString();
            } else {
                return i.toString();
            }
        };

        // Writes data to TSB with hex byte padding and updates display
        DeviceDriverHardDrive.prototype.SetTSB = function (tsb, data) {
            data = data.toLocaleUpperCase();
            for (var i = data.length; i < 124; ++i) {
                data += "0";
            }
            CTOS.Globals.m_HardDrive.SetTSB(tsb, data);
            CTOS.Control.HardDriveTableUpdate(tsb, data);
        };

        // Sets a TSB back to INIT_TSB
        DeviceDriverHardDrive.prototype.ResetTSB = function (tsb) {
            this.SetTSB(tsb, CTOS.HardDrive.INIT_TSB);
        };

        // Looks for the next available dir TSB
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

        // Looks for the next available data TSB
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
