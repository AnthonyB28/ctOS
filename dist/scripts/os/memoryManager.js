var CTOS;
(function (CTOS) {
    var Memory = (function () {
        function Memory() {
            for (var i = 0; i < 768; ++i) {
                this.m_Memory[i] = 0;
            }
        }
        Memory.prototype.set = function (address, value) {
            if (address > this.m_Memory.length) {
                CTOS.Globals.m_Console.PutText("Accessing memory out of bounds");
                //Need to do something with this properly.
            } else {
                this.m_Memory[address] = value;
            }
        };

        Memory.prototype.get = function (address, value) {
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
//# sourceMappingURL=memoryManager.js.map
