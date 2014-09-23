/* ------------
Interrupt.ts
------------ */
var CTOS;
(function (CTOS) {
    var Interrupt = (function () {
        function Interrupt(irq, params) {
            this.irq = irq;
            this.params = params;
        }
        return Interrupt;
    })();
    CTOS.Interrupt = Interrupt;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=interrupt.js.map
