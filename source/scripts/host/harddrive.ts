/**
    Hard Drive
    Uses HTML5 local storage to access and modify data using Track-Sector-Block.
    The device driver will handle conversions to and from TSB, similar to memoryManager.
    DO NOT ACCESS DIRECTLY - use the deviceDriverHardDrive instead. This is important.
    001-077 = dir data
    100-377 = data
    0/1 - @@@ - filename or data
    in use bit - next TSB or @ invalid - data string from 4 bytes to 63
**/

module CTOS
{

    export class HardDrive
    {
        static Supported: boolean = false;
        static INIT_TSB: string = "0@@@000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

        constructor()
        {
            if (this.IsSupported())
            {
                HardDrive.Supported = true;
                // May want to check storage size before continuing
                this.Init();
            }
            else
            {
                HardDrive.Supported = false;
            }
        }

        // Sets all TSBs to default and setups the MBR at 000
        private Init(): void
        {
            if (this.IsSupported())
            {
                localStorage.setItem("000", "1@@@001100ctOS MBR");
                for (var i: number = 1; i < 572; ++i)
                {
                    var baseEight: number = parseInt(i.toString(8), 10);
                    var tsb: string = "";
                    if (baseEight <= 7)
                    {
                        tsb += "00" + baseEight.toString();
                    }
                    else if (baseEight >= 10 && baseEight < 100)
                    {
                        tsb += "0" + baseEight.toString();
                    }
                    else
                    {
                        tsb += baseEight.toString();
                    }

                    localStorage.setItem(tsb, HardDrive.INIT_TSB);
                }
            }
        }

        // Write data to tsb in HTML5 storage
        public SetTSB(tsb: string, data: string): void
        {
            if (this.IsSupported())
            {
                if (tsb == "000")
                {
                    // Should maybe IRQ? Dont write here.
                }
                else
                {
                    localStorage.setItem(tsb, data);
                }
            }
        }

        // Returns the TSB from HTML5 storage
        public GetTSB(tsb: string): string
        {
            if (this.IsSupported())
            {
                if (tsb != "@@@")
                {
                    return localStorage.getItem(tsb);
                }
                else
                {
                    Globals.m_OsShell.PutTextLine("Hard Drive tried to get @@@ TSB");
                    return null;
                }
            }
            return null;
        }

        // Sets the MBR with the next available dir at TSB given
        public SetNextAvailableDir(tsb: string): string
        {
            if (this.IsSupported())
            {
                var mbr: string = localStorage.getItem("000");
                var newMbr: string = mbr.substr(0, 4) + tsb + mbr.substr(7, mbr.length);
                localStorage.setItem("000", newMbr);
                return newMbr;
            }
            return null;
        }

        // Gets the next available dir TSB from MBR
        public GetNextAvailableDir(): string
        {
            if (this.IsSupported())
            {
                var mbr: string = localStorage.getItem("000");
                return mbr.substr(4, 3);
            }
            return null;
        }

        // Sets the MBR with the next available data at TSB given
        public SetNextAvailableData(tsb: string): string
        {
            if (this.IsSupported())
            {
                var mbr: string = localStorage.getItem("000");
                var newMbr: string = mbr.substr(0, 7) + tsb + mbr.substr(10, mbr.length);
                localStorage.setItem("000", newMbr);
                return newMbr;
            }
            return null;
        }

        // Returns the next available data TSB from MBR
        public GetNextAvailableData(): string
        {
            var mbr: string = localStorage.getItem("000");
            return mbr.substr(7, 3);
        }

        // Check if HTML5 is supported via Modernizr
        private IsSupported(): boolean
        {
            if (Modernizr.localstorage)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        
    }
}