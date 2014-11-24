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
                Globals.m_StdOut.PutText("HTML5 Local Storage not supported");
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

        public CreateFile(filename: string): void
        {
            if (this.IsSupported())
            {
                if (filename.length > 59)
                {
                    Globals.m_StdOut.PutText("Filename: " + filename + " is too long.");
                    return;
                }
                var hexString: string = "";
                for (var i: number = 0; i < filename.length; ++i)
                {
                    hexString += filename.charCodeAt(i).toString(16);
                }
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
                    }
                    else
                    {
                        Globals.m_StdOut.PutText(tsbData + " data is not avail");
                    }
                }
                else
                {
                    Globals.m_StdOut.PutText(tsbDir + " dir is not avail");
                }
            }
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