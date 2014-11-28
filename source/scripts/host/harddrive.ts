/**
    Hard Drive
    Uses HTML5 local storage to access and modify data using Track-Sector-Block.
    The device driver will handle conversions to and from TSB, similar to memoryManager.
    001-077 = dir data
    100-377 = data
    0/1 - @@@ - filename or data
    in use bit - next TSB or @ invalid - data string from 4 bytes to 63
    Need 5 TSBs for a single swap file, aprox 15 available from TSB 302
**/

module CTOS
{

    export class HardDrive
    {
        static Supported: boolean = false;
        static INIT_TSB: string = "0@@@00000000000000000000000000000000000000000000000000000000000";
        
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

        private Init(): void
        {
            localStorage.setItem("000", "1@@@001100302ctOS MBR");
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

        public SetTSB(tsb: string, data: string): void
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

        public ResetTSB(tsb: string): void
        {
            localStorage.setItem(tsb, HardDrive.INIT_TSB);
        }

        public GetTSB(tsb: string): string
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

        public SetNextAvailableDir(tsb: string): void
        {
            var mbr: string = localStorage.getItem("000");
            var newMbr: string = mbr.substr(0, 4) + tsb + mbr.substr(7, mbr.length);
            localStorage.setItem("000", newMbr);
        }

        public GetNextAvailableDir(): string
        {
            var mbr: string = localStorage.getItem("000");
            return mbr.substr(4, 3);
        }

        public SetNextAvailableData(tsb: string): void
        {
            var mbr: string = localStorage.getItem("000");
            var newMbr: string = mbr.substr(0, 7) + tsb + mbr.substr(10, mbr.length);
            localStorage.setItem("000", newMbr);
        }

        public GetNextAvailableData(): string
        {
            var mbr: string = localStorage.getItem("000");
            return mbr.substr(7, 3);
        }

        public SetNextAvailableSwap(tsb: string): void
        {
            var mbr: string = localStorage.getItem("000");
            var newMbr: string = mbr.substr(0, 10) + tsb + mbr.substr(13, mbr.length);
            localStorage.setItem("000", newMbr);
        }

        public GetNextAvailableSwap(): string
        {
            var mbr: string = localStorage.getItem("000");
            return mbr.substr(10, 3);
        }

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