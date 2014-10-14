/* ------------
Instructions
http://www.labouseur.com/commondocs/6502alan-instruction-set.pdf
The instruction set for 6502 needed for P2.
------------ */
var CTOS;
(function (CTOS) {
    var Instructions = (function () {
        function Instructions() {
        }
        Instructions.Op_A9 = 169;
        Instructions.Op_AD = 173;
        Instructions.Op_8D = 141;
        Instructions.Op_6D = 109;
        Instructions.Op_A2 = 162;
        Instructions.Op_AE = 174;
        Instructions.Op_A0 = 160;
        Instructions.Op_AC = 172;
        Instructions.Op_EA = 234;
        Instructions.Op_00 = 0;
        Instructions.Op_EC = 236;
        Instructions.Op_D0 = 208;
        Instructions.Op_EE = 238;
        Instructions.Op_FF = 255;
        return Instructions;
    })();
    CTOS.Instructions = Instructions;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=instructions.js.map
