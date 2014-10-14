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
            this.Reset();
        }
        // Sets Byte in a particular address in this block of memory
        Memory.prototype.Set = function (address, hexValue) {
            this.m_Memory[address] = new CTOS.Byte(hexValue);
        };

        // Get Byte from a particular address in this block of memory
        Memory.prototype.Get = function (address) {
            return this.m_Memory[address];
        };

        // Reset memory block to 0s
        Memory.prototype.Reset = function () {
            for (var i = 0; i < 256; ++i) {
                this.m_Memory[i] = new CTOS.Byte("0");
            }
        };
        return Memory;
    })();
    CTOS.Memory = Memory;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=memory.js.map
