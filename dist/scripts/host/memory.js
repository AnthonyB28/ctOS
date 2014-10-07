/* ------------
Memory
Representation of memory hardware such as cache/RAM.
Limit = base + size, which is 0-255 in our case
------------ */
var CTOS;
(function (CTOS) {
    var Memory = (function () {
        function Memory() {
            this.m_Memory = new Array();
            for (var i = 0; i < 256; ++i) {
                this.m_Memory[i] = new CTOS.Byte("0");
            }
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
                return new CTOS.Byte("0");
            } else {
                return this.m_Memory[address];
            }
        };
        return Memory;
    })();
    CTOS.Memory = Memory;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=memory.js.map
