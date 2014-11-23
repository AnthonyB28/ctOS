/**
    Hard Drive
    Uses HTML5 local storage to access and modify data using Track-Sector-Block.
    The device driver will handle conversions to and from TSB, similar to memoryManager.
**/

module CTOS
{

    export class HardDrive
    {
        static Supported: boolean = false;
        private HTML
        
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