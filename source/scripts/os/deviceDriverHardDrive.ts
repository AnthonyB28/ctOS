/**
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
        static IRQ_DELETE_FILE: number = 5;

        private m_AvailableDir: Array<number>;
        private m_AvailableData: Array<number>;

        constructor()
        {
            // Override the base method pointers.
            super(this.krnHdDriverEntry, this.krnHdDriverISR);
            this.m_AvailableDir = new Array<number>();
            for (var i: number = 1; i < 64; ++i)
            {
                var tsb: string = "";
                var baseEight: number = parseInt(i.toString(8), 10);
                if (i <= 7)
                {
                    tsb += "00" + baseEight.toString();
                }
                else
                {
                    tsb += "0" + baseEight.toString();
                }
                this.m_AvailableDir[tsb] = 0;
            }
            this.m_AvailableData = new Array<number>();
            for (var i: number = 64; i < 256; ++i)
            {
                var baseEight: number = parseInt(i.toString(8), 10);
                this.m_AvailableData[baseEight.toString()] = 0;
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
                case DeviceDriverHardDrive.IRQ_DELETE_FILE:
                    this.DeleteFile(params[1]); break;
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
                        this.m_AvailableDir[tsbDir] = 1;
                        this.m_AvailableData[tsbData] = 1;
                        var nextDir: number = this.ProbeNextAvailableDir();
                        var nextData: number = this.ProbeNextAvailableData()
                        Globals.m_HardDrive.SetNextAvailableDir(this.ConvertIntegerToTSB(nextDir));
                        Globals.m_HardDrive.SetNextAvailableData(this.ConvertIntegerToTSB(nextData));
                        Globals.m_OsShell.PutTextLine("Success - filename TSB " + tsbDir + " data TSB " +tsbData);
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

        private DeleteFile(file: string): void
        {
            if (this.IsSupported())
            {
                var dirTSB: string = this.GetDirTSBFromFilename(file);
                if (!dirTSB)
                {
                    return;
                }
                var dataTSB: string = Globals.m_HardDrive.GetTSB(dirTSB).substr(1, 3);
                this.m_AvailableDir[dirTSB] = 0;
                Globals.m_HardDrive.SetNextAvailableDir(dirTSB);
                Globals.m_HardDrive.ResetTSB(dirTSB);
                this.DeleteDataTSB(dataTSB);
                Globals.m_StdOut.PutText("Success");
            }
        }

        private ReadFile(file: string): string
        {
            if (this.IsSupported())
            {
                var firstDataTSB: string = Globals.m_HardDrive.GetTSB(this.GetDirTSBFromFilename(file)).substr(1,3);
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
                var firstDataTSB: string = Globals.m_HardDrive.GetTSB(this.GetDirTSBFromFilename(file)).substring(1,4);
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
                        this.DeleteDataTSB(firstDataTSB); // Make sure to reset the data chain, if needed
                        var curDataTSB: string = firstDataTSB;
                        var nextAvailDataTSB: string = Globals.m_HardDrive.GetNextAvailableData();
                        this.m_AvailableData[curDataTSB] = 1;
                        // Get next available tsb, set the current tsb with next available tsb and data
                        for (var i: number = 0; i < tsbNeededToFill; ++i)
                        {
                            var startIndex: number = i * (118); //118 = 59*2 for hex byte
                            var endIndex: number = i + 117;
                            Globals.m_HardDrive.SetTSB(curDataTSB, "1" + nextAvailDataTSB + hexDataToWrite.substr(startIndex, endIndex));
                            this.m_AvailableData[nextAvailDataTSB] = 1; // Flag next TSB as in use for next loop
                            curDataTSB = nextAvailDataTSB;
                            nextAvailDataTSB = this.ProbeNextAvailableData().toString();
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
                this.m_AvailableData[tsb] = 0;
                tsb = Globals.m_HardDrive.GetTSB(tsb).substr(1, 3);
                Globals.m_HardDrive.ResetTSB(tsb);
            }
        }

        private GetDirTSBFromFilename(file:string): string
        {
            for (var i: number = 1; i < 64; ++i)
            {
                var tsb: string = "";
                if (i <= 7)
                {
                    var baseEight: number = parseInt(i.toString(8), 10);
                    tsb += "00" + baseEight.toString();
                }
                else
                {
                    var baseEight: number = parseInt(i.toString(8), 10);
                    tsb += "0" + baseEight.toString();
                }
                var dirData: string = Globals.m_HardDrive.GetTSB(tsb);
                if (dirData[0] == "1")
                {
                    var fileName: string = Utils.ConvertHexToString(dirData.substr(4, dirData.length-4));
                    if (fileName == file)
                    {
                        return tsb;
                    }
                }
            }
            Globals.m_OsShell.PutTextLine("Filename doesn't exist.");
            return null;
        }

        private ConvertIntegerToTSB(i: number): string
        {
            if (i <= 7)
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
            for (var i: number = 1; i < 64; ++i)
            {
                var tsb: string = "";
                if (i <= 7)
                {
                    var baseEight: number = parseInt(i.toString(8), 10);
                    tsb += "00" + baseEight.toString();
                }
                else
                {
                    var baseEight: number = parseInt(i.toString(8), 10);
                    tsb += "0" + baseEight.toString();
                }
                if (this.m_AvailableDir[tsb] == 0)
                {
                    return baseEight;
                }
            }
        }

        private ProbeNextAvailableData(): number
        {
            for (var i: number = 64; i < 256; ++i)
            {
                var baseEight: number = parseInt(i.toString(8), 10);
                if (this.m_AvailableData[baseEight.toString()] == 0)
                {
                    return baseEight;
                }
            } 
        }
    }
}