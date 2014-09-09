/* ------------------------------
     DeviceDriver.ts

     The "base class" for all Device Drivers.
     ------------------------------ */

module CTOS {
    export class DeviceDriver {
        public version = '0.06';
        public status = 'unloaded';
        public preemptable = false;

        constructor(public driverEntry = null,
                    public isr = null) {

        }
    }
}
