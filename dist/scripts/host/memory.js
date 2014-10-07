/* ------------
Memory
Representation of memory hardware such as cache/RAM.
------------ */
var CTOS;
(function (CTOS) {
    var Memory = (function () {
        function Memory() {
        }
        // Sets Byte in a particular address in this block of memory
        Memory.prototype.set = function (address, hexValue) {
            if (address > this.m_Memory.length) {
                CTOS.Globals.m_Console.PutText("Accessing memory out of bounds");
                //Need to do something with this properly.
            } else {
                this.m_Memory[address] = new CTOS.Byte(hexValue);
            }
        };

        // Get Byte from a particular address in this block of memory
        Memory.prototype.get = function (address) {
            if (address > this.m_Memory.length) {
                CTOS.Globals.m_Console.PutText("Accessing memory out of bounds");

                //Need to do something with this properly.
                return 0;
            } else {
                return this.m_Memory[address];
            }
        };
        return Memory;
    })();
    CTOS.Memory = Memory;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=memory.js.map
