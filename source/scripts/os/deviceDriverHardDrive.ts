﻿/**
    The driver that allows ctOS to interface with the hard drive.
    Will handle the conversion and display of TSB information.
**/

module CTOS
{
    // Extends DeviceDriver
    export class DeviceDriverHardDrive extends DeviceDriver
    {
        static IRQ_FORMAT: number = 0;
        static IRQ_CREATE_FILE: number = 1;
        static IRQ_CREATE_FILE_DATA: number = 2;
        static IRQ_WRITE_DATA: number = 3;
        static IRQ_READ_FILE: number = 4;

        private m_AvailableDir: Array<number>;
        private m_AvailableData: Array<number>;

        constructor()
        {
            // Override the base method pointers.
            super(this.krnHdDriverEntry, this.krnHdDriverISR);
            this.m_AvailableDir = new Array<number>();
            for (var i: number = 1; i < 78; ++i)
            {
                this.m_AvailableDir[i] = 0;
            }
            this.m_AvailableData = new Array<number>();
            for (var i: number = 100; i < 378; ++i)
            {
                this.m_AvailableData[i] = 0;
            }
        }

        public krnHdDriverISR(params): void
        {
            switch(params[0])
            {
                case DeviceDriverHardDrive.IRQ_FORMAT:
                    this.Format(); break;
                case DeviceDriverHardDrive.IRQ_CREATE_FILE:
                    this.CreateFile(params[1]); break;
                case DeviceDriverHardDrive.IRQ_WRITE_DATA:
                    this.WriteData(params[1], params[2]); break;
                case DeviceDriverHardDrive.IRQ_READ_FILE:
                    var fileData: string = this.ReadFile(params[1]);
                    if (fileData)
                    {
                        Globals.m_OsShell.PutTextLine(this.ReadFile(params[1]));
                    }
                    break;
            }
        }

        public krnHdDriverEntry():void
        {
            if (this.IsSupported)
            {
                // Initialization routine for this
                this.status = "loaded";
                // More?
            }
        }

        private IsSupported(): boolean
        {
            if (HardDrive.Supported)
            {
                return true;
            }
            else
            {
                Globals.m_OsShell.PutTextLine("HTML5 Local Storage not supported");
                return false;
            }
        }

        public Format(): void
        {
            if (this.IsSupported())
            {
                // TODO: make sure we're not running programs
                Globals.m_HardDrive = new HardDrive();
            }
        }

        private CreateFile(filename: string): void
        {
            if (this.IsSupported())
            {
                if (filename.length > 59)
                {
                    Globals.m_OsShell.PutTextLine("Error - Filename: " + filename + " is too long.");
                    return;
                }
                var hexString: string = Utils.ConvertToHex(filename);
                var tsbDir: string = Globals.m_HardDrive.GetNextAvailableDir();
                var tsbData: string = Globals.m_HardDrive.GetNextAvailableData();
                if (Globals.m_HardDrive.GetTSB(tsbDir)[0] == "0")
                {
                    if (Globals.m_HardDrive.GetTSB(tsbData)[0] == "0")
                    {
                        var fileNameStr: string = "1" + tsbData + hexString;
                        Globals.m_HardDrive.SetTSB(tsbDir, fileNameStr);
                        Globals.m_HardDrive.SetTSB(tsbData, "1@@@");
                        this.m_AvailableDir[parseInt(tsbDir, 10)] = 1;
                        this.m_AvailableData[parseInt(tsbData, 10)] = 1;
                        var nextDir: number = this.ProbeNextAvailableDir();
                        var nextData: number = this.ProbeNextAvailableData()
                        Globals.m_HardDrive.SetNextAvailableDir(this.ConvertIntegerToTSB(nextDir));
                        Globals.m_HardDrive.SetNextAvailableData(this.ConvertIntegerToTSB(nextData));
                        Globals.m_OsShell.PutTextLine("Success - filename TSB " + tsbDir);
                    }
                    else
                    {
                        Globals.m_OsShell.PutTextLine("Error - TSB" + tsbData + " data not avail");
                    }
                }
                else
                {
                    Globals.m_OsShell.PutTextLine("Error - TSB" + tsbDir + " dir not avail");
                }
            }
        }

        private ReadFile(file: string): string
        {
            if (this.IsSupported())
            {
                var firstDataTSB: string = this.GetDataTSBFromFilename(file);
                if (firstDataTSB)
                {
                    var hexData: string = "";
                    var data: string = "";
                    var dataTSB: string = firstDataTSB;
                    do 
                    {
                        hexData = Globals.m_HardDrive.GetTSB(dataTSB);
                        dataTSB = hexData.substr(1, 3);
                        data += Utils.ConvertHexToString(hexData.substr(4, hexData.length - 4));
                    } while (dataTSB != "@@@")
                }

                return data;
            }
            else
            {
                return null;
            }
        }

        private WriteData(file:string, data: string): void
        {
            if (this.IsSupported())
            {
                var firstDataTSB: string = this.GetDataTSBFromFilename(file);
                if (firstDataTSB)
                {
                    var tsbNeededToFill: number = Math.ceil(data.length / 59);
                    var hexDataToWrite: string = Utils.ConvertToHex(data);
                    if (tsbNeededToFill == 1)
                    {
                        Globals.m_HardDrive.SetTSB(firstDataTSB, "1@@@" + hexDataToWrite);
                    }
                    else
                    {
                        var startingDataTSB: string = Globals.m_HardDrive.GetTSB(firstDataTSB).substr(1, 3);
                        this.DeleteDataTSB(startingDataTSB); // Make sure to reset the data chain, if needed
                        var curDataTSB: string = startingDataTSB;
                        var nextAvailDataTSB: string = Globals.m_HardDrive.GetNextAvailableData();
                        // Get next available tsb, set the current tsb with next available tsb and data
                        for (var i: number = 0; i < tsbNeededToFill; ++i)
                        {
                            var startIndex: number = i * (118); //118 = 59*2 for hex byte
                            var endIndex: number = i + 118;
                            Globals.m_HardDrive.SetTSB(curDataTSB, "1" + nextAvailDataTSB + hexDataToWrite.substr(startIndex, endIndex));
                            this.m_AvailableData[parseInt(curDataTSB, 10)] = 1; // Set this data TSB to in use
                            curDataTSB = nextAvailDataTSB;
                            nextAvailDataTSB = this.ProbeNextAvailableData().toString();
                            Globals.m_OsShell.PutTextLine(hexDataToWrite.substr(startIndex, endIndex) + " written to " + curDataTSB);
                        }
                        Globals.m_HardDrive.SetNextAvailableData(nextAvailDataTSB);
                    }
                    Globals.m_OsShell.PutTextLine("Success writing data");
                }
            }
        }

        private DeleteDataTSB(tsb: string): void
        {
            while (tsb != "@@@")
            {
                this.m_AvailableData[parseInt(tsb, 10)] = 0;
                tsb = Globals.m_HardDrive.GetTSB(tsb).substr(1, 3);
                Globals.m_HardDrive.ResetTSB(tsb);
            }
        }

        private GetDataTSBFromFilename(file:string): string
        {
            for (var i: number = 1; i < 77; ++i)
            {
                var tsb: string = "";
                if (i < 10)
                {
                    tsb += "00" + i.toString();
                }
                else
                {
                    tsb += "0" + i.toString();
                }
                var dirData: string = Globals.m_HardDrive.GetTSB(tsb);
                if (dirData[0] == "1")
                {
                    var fileName: string = Utils.ConvertHexToString(dirData.substr(4, file.length * 2));
                    if (fileName == file)
                    {
                        return dirData.substr(1, 3);
                    }
                }
            }
            Globals.m_OsShell.PutTextLine("Filename doesn't exist.");
            return null;
        }

        private ConvertIntegerToTSB(i: number): string
        {
            if (i < 10)
            {
                return "00" + i.toString();
            }
            else if (i >= 10 && i < 100)
            {
                return "0" + i.toString();
            }
            else
            {
               return i.toString();
            }
        }

        private ProbeNextAvailableDir(): number
        {
            for (var i: number = 1; i < 78; ++i)
            {
                if (this.m_AvailableDir[i] == 0)
                {
                    return i;
                }
            }
        }

        private ProbeNextAvailableData(): number
        {
            for (var i: number = 100; i < 378; ++i)
            {
                if (this.m_AvailableData[i] == 0)
                {
                    return i;
                }
            } 
        }
    }
}