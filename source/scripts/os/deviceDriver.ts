/* ------------------------------
   DeviceDriver.js

   The "base class" (or 'prototype') for all Device Drivers.
   ------------------------------ */

module AlanBBOS {
  export class DeviceDriver {
    public version = '0.07';
    public status = 'unloaded';
    public preemptable = false;

    constructor(public driverEntry = null,
                public isr = null) {

    }
  }
}
