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
            for (var i: number = 1; i < 378; ++i)
            {
                var tsb: string = "";
                if (i < 10)
                {
                    tsb += "00" + i.toString();
                }
                else if (i >= 10 && i < 100)
                {
                    tsb += "0" + i.toString();
                }
                else
                {
                    tsb += i.toString();
                }
                localStorage.setItem(tsb, "0@@@00000000000000000000000000000000000000000000000000000000000");
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

        public GetTSB(tsb: string): string
        {
            return localStorage.getItem(tsb);
        }

        public SetNextAvailableDir(tsb: string): void
        {
            var mbr: string = localStorage.getItem("000");
            mbr[4] = tsb[0];
            mbr[5] = tsb[1];
            mbr[6] = tsb[2];
            localStorage.setItem("000", mbr);
        }

        public GetNextAvailableDir(): string
        {
            var mbr: string = localStorage.getItem("000");
            return mbr.substr(4, 7);
        }

        public SetNextAvailableData(tsb: string): void
        {
            var mbr: string = localStorage.getItem("000");
            mbr[7] = tsb[0];
            mbr[8] = tsb[1];
            mbr[9] = tsb[2];
            localStorage.setItem("000", mbr);
        }

        public GetNextAvailableData(): string
        {
            var mbr: string = localStorage.getItem("000");
            return mbr.substr(7, 10);
        }

        public SetNextAvailableSwap(tsb: string): void
        {
            var mbr: string = localStorage.getItem("000");
            mbr[10] = tsb[0];
            mbr[11] = tsb[1];
            mbr[12] = tsb[2];
            localStorage.setItem("000", mbr);
        }

        public GetNextAvailableSwap(): string
        {
            var mbr: string = localStorage.getItem("000");
            return mbr.substr(10, 13);
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