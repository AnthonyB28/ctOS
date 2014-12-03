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
                localStorage.setItem("000", "1"+DeviceDriverHardDrive.TSB_INVALID+"001100ctOS MBR");
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

                    localStorage.setItem(tsb, DeviceDriverHardDrive.TSB_INIT);
                }
            }
        }

        // Write data to tsb in HTML5 storage
        public SetTSB(tsb: string, data: string): void
        {
            if (this.IsSupported())
            {
                localStorage.setItem(tsb, data);
            }
        }

        // Returns the TSB from HTML5 storage
        public GetTSB(tsb: string): string
        {
            if (this.IsSupported())
            {
                if (tsb != DeviceDriverHardDrive.TSB_INVALID)
                {
                    return localStorage.getItem(tsb);
                }
                else
                {
                    Globals.m_OsShell.PutTextLine("Hard Drive tried to get " + DeviceDriverHardDrive.TSB_INVALID+ " TSB");
                    return null;
                }
            }
            return null;
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