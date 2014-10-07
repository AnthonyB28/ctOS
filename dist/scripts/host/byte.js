/* ---------
Byte
Representation of a byte of data for programs.
Instead of calling parseInt whenever you call getDecimal or getHex, its easier -
to just store the numbers once they are set. Takes more memory for members, but less computations.
--------*/
var CTOS;
(function (CTOS) {
    var Byte = (function () {
        function Byte(hex) {
            this.m_HexData = "00";
            this.m_DecimalNumber = 0;
            this.m_HexData = hex;
            this.m_DecimalNumber = parseInt(this.m_HexData, 16);
        }
        Byte.prototype.GetDecimal = function () {
            return this.m_DecimalNumber;
        };

        Byte.prototype.GetHex = function () {
            return this.m_HexData;
        };
        return Byte;
    })();
    CTOS.Byte = Byte;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=byte.js.map
