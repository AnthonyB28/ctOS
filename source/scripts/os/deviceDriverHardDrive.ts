/**
    The driver that allows ctOS to interface with the hard drive.
    Will handle the conversion and display of TSB information.
**/

module CTOS
{
    // Extends DeviceDriver
    export class DeviceDriverHardDrive extends DeviceDriver
    {
        static TSB_INIT: string = "0@@@000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
        static TSB_INVALID: string = "@@@";

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

        // Sets the available dictionaries and the display
        private Init(): void
        {
            Control.HardDriveTableInit();
            // If hard drive has empty string, enable bootvideo
            Control.BootVideoSet(!Boolean(Globals.m_HardDrive.GetTSB("bootVideo")));

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

        // Writes the boot video settings to the hard drive.
        // This would technically be a BIOS thing, but we need to use local storage here.
        public static StoreBootVidSetting(): void
        {
            // "Hacky" as in not part of the OS simulation. Unrealistic!
            // Checkbox exists outside of krnBootstrap. Hard drive boots after this can be modified...
            if (Globals.m_HardDrive == null)
            {
                Globals.m_HardDrive = new HardDrive();
            }

            if (Globals.m_BootVideo)
            {
                Globals.m_HardDrive.SetTSB("bootVideo", "");
            }
            else
            {
                Globals.m_HardDrive.SetTSB("bootVideo", "turnOff");
            }
        }

        // Driver interrupt request handling.
        public krnHdDriverISR(params): void
        {
            switch(params[0])
            {
                case DeviceDriverHardDrive.IRQ_FORMAT:
                    this.Format();
                    Globals.m_Kernel.Trace("Hard drive format request.");
                    break;
                case DeviceDriverHardDrive.IRQ_CREATE_FILE:
                    this.CreateFile(params[1]);
                    Globals.m_Kernel.Trace("Hard drive create file request.");
                    break;
                case DeviceDriverHardDrive.IRQ_WRITE_DATA:
                    this.WriteData(params[1], params[2]);
                    Globals.m_Kernel.Trace("Hard drive write data request.");
                    break;
                case DeviceDriverHardDrive.IRQ_READ_FILE:
                    var fileData: string = this.ReadFile(params[1]);
                    Globals.m_Kernel.Trace("Hard drive read file request.");
                    if (fileData)
                    {
                        Globals.m_OsShell.PutTextLine(this.ReadFile(params[1]));
                    }
                    break;
                case DeviceDriverHardDrive.IRQ_DELETE_FILE:
                    Globals.m_Kernel.Trace("Hard drive delete file request");
                    this.DeleteFile(params[1]);
                    break;
                case DeviceDriverHardDrive.IRQ_LIST_DISK:
                    Globals.m_Kernel.Trace("Hard drive list files request");
                    this.ListFiles();
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

        // Check if harddrive functionality is available
        public IsSupported(): boolean
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

        // Format (reinit) the drive without disturbing the CPU/ReadyQ
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

        // Create a new file
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

                // Convert the filename to hex data and find where to store it and initial data
                var hexString: string = Utils.ConvertToHex(filename);
                var tsbDir: string = this.GetNextAvailableDir();
                var tsbData: string = this.GetNextAvailableData();

                // As long as the directories are not in use, we can use them.
                if (Globals.m_HardDrive.GetTSB(tsbDir)[0] == "0")
                {
                    if (Globals.m_HardDrive.GetTSB(tsbData)[0] == "0")
                    {
                        var fileNameStr: string = "1" + tsbData + hexString; // Data to store at dir tsb
                        this.SetTSB(tsbDir, fileNameStr);
                        this.SetTSB(tsbData, "1@@@");
                        // Mark these tsbs as in use
                        this.m_AvailableDir[tsbDir] = 1;
                        this.m_AvailableData[tsbData] = 1;
                        // Get the next tsbs and mark them in the MBR
                        var nextDir: number = this.ProbeNextAvailableDir();
                        var nextData: number = this.ProbeNextAvailableData()
                        Control.HardDriveMBRUpdate(this.SetNextAvailableDir(this.ConvertBaseEightToTSB(nextDir)));
                        Control.HardDriveMBRUpdate(this.SetNextAvailableData(this.ConvertBaseEightToTSB(nextData)));
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

        // Deletes the specified file if available
        private DeleteFile(file: string): void
        {
            if (this.IsSupported())
            {
                // Attempt to get the file TSB data from the drive
                var dirTSB: string = this.GetDirTSBFromFilename(file);
                if (!dirTSB)
                {
                    return;
                }
                var dataTSB: string = Globals.m_HardDrive.GetTSB(dirTSB).substr(1, 3); // Get the tsb from the data
                // Reset the dir and file data, mark as available
                this.m_AvailableDir[dirTSB] = 0;
                Control.HardDriveMBRUpdate(this.SetNextAvailableDir(dirTSB));
                this.ResetTSB(dirTSB);
                this.DeleteDataTSB(dataTSB);
                Globals.m_OsShell.PutTextLine("Success");
            }
        }

        // Return the data string from the file provided
        private ReadFile(file: string): string
        {
            if (this.IsSupported())
            {
                // Get the dir TSB if file exists
                var fileTSB: string = this.GetDirTSBFromFilename(file);
                if (fileTSB)
                {
                    // Get the data TSB if it exists, loop through converting hex, and return.
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
                        } while (dataTSB != DeviceDriverHardDrive.TSB_INVALID)
                    }

                    return data;
                }
            }

            return null;
        }

        // Writes data to a file if available
        private WriteData(file:string, data: string): void
        {
            if (this.IsSupported())
            {
                // Find if file exists
                var fileTSB: string = this.GetDirTSBFromFilename(file);
                if (fileTSB)
                {
                    // Obtain where the start of the data should be if available
                    var firstDataTSB: string = Globals.m_HardDrive.GetTSB(fileTSB).substring(1, 4);
                    if (firstDataTSB)
                    {
                        // Figure out how many TSBs we need, and fill them.
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
                            this.m_AvailableData[curDataTSB] = 1;
                            var nextAvailDataTSB: string = this.ConvertBaseEightToTSB(this.ProbeNextAvailableData());
                            // Get next available tsb, set the current tsb with next available tsb and data
                            for (var i: number = 0; i < tsbNeededToFill; ++i)
                            {
                                var startIndex: number = i * (118); //118 = 59*2 for hex byte
                                var endIndex: number = i + 117;

                                if (i + 1 == tsbNeededToFill) // Don't need to worry about next TSB
                                {
                                    this.SetTSB(curDataTSB, "1" + DeviceDriverHardDrive.TSB_INVALID + hexDataToWrite.substr(startIndex, endIndex));
                                }
                                else
                                {
                                    this.SetTSB(curDataTSB, "1" + nextAvailDataTSB + hexDataToWrite.substr(startIndex, endIndex));
                                    this.m_AvailableData[nextAvailDataTSB] = 1; // Flag next TSB as in use for next loop
                                    curDataTSB = nextAvailDataTSB;
                                    nextAvailDataTSB = this.ProbeNextAvailableData().toString();
                                    if (nextAvailDataTSB == DeviceDriverHardDrive.TSB_INVALID)
                                    {
                                        Globals.m_OsShell.PutTextLine("Error - Ran out of data! Next TSB not available. Partial written file.");
                                        Control.HardDriveMBRUpdate(this.SetNextAvailableData(curDataTSB));
                                        return;
                                    }
                                }
                            }
                            Control.HardDriveMBRUpdate(this.SetNextAvailableData(nextAvailDataTSB));
                        }
                        Globals.m_OsShell.PutTextLine("Success writing data");
                    }
                }
            }
        }

        // Resets a data TSB and all of its links, if any
        private DeleteDataTSB(tsb: string): void
        {
            Control.HardDriveMBRUpdate(this.SetNextAvailableData(tsb));
            var nextTSB: string = "";
            do
            {
                // Get the next TSB, reset this TSB, set this to next
                nextTSB = Globals.m_HardDrive.GetTSB(tsb).substr(1, 3);
                this.m_AvailableData[tsb] = 0;
                this.ResetTSB(tsb);
                tsb = nextTSB;
            } while (tsb != DeviceDriverHardDrive.TSB_INVALID)
        }

        // Lists all filenames
        private ListFiles(): void
        {
            var numberOfFiles: number = 0;
            // Loop through base 8 in directory and print names of files
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

        // Returns the whole dir TSB of the file provided, false if no error for not found. Returns null if not found.
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

        // Converts a base 8 number to TSB
        private ConvertBaseEightToTSB(i: number): string
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

        // Writes data to TSB with hex byte padding and updates display
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

        // Sets a TSB back to INIT_TSB
        private ResetTSB(tsb: string): void
        {
            this.SetTSB(tsb, DeviceDriverHardDrive.TSB_INIT);
        }

        // Looks for the next available dir TSB
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

        // Looks for the next available data TSB
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

        // Retrieves the swap data for pcb from drive, and deletes it!
        public SwapReadClear(pcb: ProcessControlBlock): string
        {
            if (this.IsSupported())
            {
                if (pcb.m_SwapTSB != DeviceDriverHardDrive.TSB_INVALID)
                {
                    var hexData: string = "";
                    var data: string = "";
                    var dataTSB: string = pcb.m_SwapTSB;
                    
                    do 
                    {
                        // Get data from this TSB, clear this TSB, get next TSB from data, loop
                        hexData = Globals.m_HardDrive.GetTSB(dataTSB);
                        this.m_AvailableData[dataTSB] = 0;
                        this.ResetTSB(dataTSB);
                        dataTSB = hexData.substr(1, 3);
                        data += hexData.substr(4, hexData.length - 4);
                        
                    } while (dataTSB != DeviceDriverHardDrive.TSB_INVALID)

                    // Update the MBR with the next available TSB that isn't from the PCB. Requires probing and conversion from base 8
                    Control.HardDriveMBRUpdate(this.SetNextAvailableData(this.ConvertBaseEightToTSB(this.ProbeNextAvailableData())));
                    pcb.m_SwapTSB = DeviceDriverHardDrive.TSB_INVALID;
                    return data;
                }
                return null;
            }
            return null;
        }

        // Writes data to a file if available
        public SwapWrite(pcb: ProcessControlBlock, data: string): boolean
        {
            if (this.IsSupported())
            {
                // Obtain where the start of the data should be if available
                var firstDataTSB: string = this.GetNextAvailableData();
                if (firstDataTSB)
                {
                    // Figure out how many TSBs we need, and fill them.
                    this.DeleteDataTSB(firstDataTSB); // Make sure to reset the data chain, if needed
                    var curDataTSB: string = firstDataTSB;
                    pcb.m_SwapTSB = curDataTSB;
                    this.m_AvailableData[curDataTSB] = 1;
                    var nextAvailDataTSB: string = this.ConvertBaseEightToTSB(this.ProbeNextAvailableData());
                    // We need at most 5 TSBs for memory
                    // Get next available tsb, set the current tsb with next available tsb and data
                    for (var i: number = 0; i < 5; ++i)
                    {
                        var startIndex: number = i * 120; //60*2 for hex byte
                        if (i == 4) // Don't have to worry about next TSB
                        {
                            this.SetTSB(curDataTSB, "1" + DeviceDriverHardDrive.TSB_INVALID + data.substr(startIndex));
                        }
                        else
                        {
                            this.SetTSB(curDataTSB, "1" + nextAvailDataTSB + data.substr(startIndex, 120));
                            this.m_AvailableData[nextAvailDataTSB] = 1; // Flag next TSB as in use for next loop
                            curDataTSB = nextAvailDataTSB;
                            nextAvailDataTSB = this.ProbeNextAvailableData().toString();
                            if (nextAvailDataTSB == DeviceDriverHardDrive.TSB_INVALID)
                            {
                                Globals.m_OsShell.PutTextLine("Error - Ran out of data! Next TSB not available. Partial written file for program!!!");
                                Control.HardDriveMBRUpdate(this.SetNextAvailableData(curDataTSB));
                                return false;
                            }
                        }
                    }
                    Control.HardDriveMBRUpdate(this.SetNextAvailableData(nextAvailDataTSB));
                    return true;
                }
            }
            return false; // Error
        }

        // Sets the MBR with the next available dir at TSB given
        public SetNextAvailableDir(tsb: string): string
        {
            if (this.IsSupported())
            {
                var mbr: string = Globals.m_HardDrive.GetTSB("000");
                var newMbr: string = mbr.substr(0, 4) + tsb + mbr.substr(7, mbr.length);
                Globals.m_HardDrive.SetTSB("000", newMbr);
                return newMbr;
            }
            return null;
        }

        // Gets the next available dir TSB from MBR
        public GetNextAvailableDir(): string
        {
            if (this.IsSupported())
            {
                var mbr: string = Globals.m_HardDrive.GetTSB("000");
                return mbr.substr(4, 3);
            }
            return null;
        }

        // Sets the MBR with the next available data at TSB given
        public SetNextAvailableData(tsb: string): string
        {
            if (this.IsSupported())
            {
                var mbr: string = Globals.m_HardDrive.GetTSB("000");
                var newMbr: string = mbr.substr(0, 7) + tsb + mbr.substr(10, mbr.length);
                Globals.m_HardDrive.SetTSB("000", newMbr);
                return newMbr;
            }
            return null;
        }

        // Returns the next available data TSB from MBR
        public GetNextAvailableData(): string
        {
            var mbr: string = Globals.m_HardDrive.GetTSB("000");
            return mbr.substr(7, 3);
        }

    }
}