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
        static IRQ_LIST_DISK: number = 6;

        private m_AvailableDir: Array<number>;
        private m_AvailableData: Array<number>;

        constructor()
        {
            // Override the base method pointers.
            super(this.krnHdDriverEntry, this.krnHdDriverISR);
            this.Init();
        }

        private Init(): void
        {
            Control.HardDriveTableInit();
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
                case DeviceDriverHardDrive.IRQ_LIST_DISK:
                    this.ListFiles(); break;
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

        private Format(): void
        {
            if (this.IsSupported())
            {
                if (Globals.m_KernelReadyQueue.getSize() > 0)
                {
                    Globals.m_OsShell.PutTextLine("Error - programs in ready queue!");
                    return;
                }
                if (Globals.m_CPU.m_IsExecuting)
                {
                    Globals.m_OsShell.PutTextLine("Error - programs are running on CPU!");
                    return;
                }

                Globals.m_HardDrive = new HardDrive();
                this.Init();
            }
        }

        private CreateFile(filename: string): void
        {
            if (this.IsSupported())
            {
                if (filename.length > 60)
                {
                    Globals.m_OsShell.PutTextLine("Error - Filename: " + filename + " is too long.");
                    return;
                }
                if (this.GetDirTSBFromFilename(filename, false))
                {
                    Globals.m_OsShell.PutTextLine("Error - Filename: " + filename + " already exists.");
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
                        this.SetTSB(tsbDir, fileNameStr);
                        this.SetTSB(tsbData, "1@@@");
                        this.m_AvailableDir[tsbDir] = 1;
                        this.m_AvailableData[tsbData] = 1;
                        var nextDir: number = this.ProbeNextAvailableDir();
                        var nextData: number = this.ProbeNextAvailableData()
                        Control.HardDriveMBRUpdate(Globals.m_HardDrive.SetNextAvailableDir(this.ConvertIntegerToTSB(nextDir)));
                        Control.HardDriveMBRUpdate(Globals.m_HardDrive.SetNextAvailableData(this.ConvertIntegerToTSB(nextData)));
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
                Control.HardDriveMBRUpdate(Globals.m_HardDrive.SetNextAvailableDir(dirTSB));
                this.ResetTSB(dirTSB);
                this.DeleteDataTSB(dataTSB);
                Globals.m_OsShell.PutTextLine("Success");
            }
        }

        private ReadFile(file: string): string
        {
            if (this.IsSupported())
            {
                var fileTSB: string = this.GetDirTSBFromFilename(file);
                if (fileTSB)
                {
                    var firstDataTSB: string = Globals.m_HardDrive.GetTSB(fileTSB).substr(1, 3);
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
            }

            return null;
        }

        private WriteData(file:string, data: string): void
        {
            if (this.IsSupported())
            {
                var fileTSB: string = this.GetDirTSBFromFilename(file);
                if (fileTSB)
                {
                    var firstDataTSB: string = Globals.m_HardDrive.GetTSB(fileTSB).substring(1, 4);
                    if (firstDataTSB)
                    {
                        var tsbNeededToFill: number = Math.ceil(data.length / 59);
                        var hexDataToWrite: string = Utils.ConvertToHex(data);
                        if (tsbNeededToFill == 1)
                        {
                            this.SetTSB(firstDataTSB, "1@@@" + hexDataToWrite);
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
                                this.SetTSB(curDataTSB, "1" + nextAvailDataTSB + hexDataToWrite.substr(startIndex, endIndex));
                                this.m_AvailableData[nextAvailDataTSB] = 1; // Flag next TSB as in use for next loop
                                curDataTSB = nextAvailDataTSB;
                                nextAvailDataTSB = this.ProbeNextAvailableData().toString();
                            }
                            Control.HardDriveMBRUpdate(Globals.m_HardDrive.SetNextAvailableData(nextAvailDataTSB));
                        }
                        Globals.m_OsShell.PutTextLine("Success writing data");
                    }
                }
            }
        }

        private DeleteDataTSB(tsb: string): void
        {
            var nextTSB: string = "";
            while (nextTSB != "@@@")
            {
                this.m_AvailableData[tsb] = 0;
                nextTSB = Globals.m_HardDrive.GetTSB(tsb).substr(1, 3);
                this.ResetTSB(tsb);
                tsb = nextTSB;
            }
        }

        private ListFiles(): void
        {
            var numberOfFiles: number = 0;
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
                    Globals.m_OsShell.PutTextLine(Utils.ConvertHexToString(dirData.substr(4, dirData.length - 4)));
                    ++numberOfFiles;
                }
            }

            Globals.m_OsShell.PutTextLine("# of files: " + numberOfFiles.toString());
        }

        private GetDirTSBFromFilename(file:string, error:boolean = true): string
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
                    var fileName: string = Utils.ConvertHexToString(dirData.substr(4, dirData.length - 4)).replace(/\0/g, '');

                    if (fileName == file)
                    {
                        return tsb;
                    }
                }
            }
            if (error)
            {
                Globals.m_OsShell.PutTextLine("Filename doesn't exist.");
            }
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

        private SetTSB(tsb: string, data: string): void
        {
            data = data.toLocaleUpperCase();
            for (var i: number = data.length; i < 124; ++i)
            {
                data += "0";
            }
            Globals.m_HardDrive.SetTSB(tsb, data);
            Control.HardDriveTableUpdate(tsb, data);
        }

        private ResetTSB(tsb: string): void
        {
            this.SetTSB(tsb, HardDrive.INIT_TSB);
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