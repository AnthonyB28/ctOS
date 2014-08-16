/* ------------
Interrupt.ts
------------ */
var AlanBBOS;
(function (AlanBBOS) {
    var Interrupt = (function () {
        function Interrupt(irq, params) {
            this.irq = irq;
            this.params = params;
        }
        return Interrupt;
    })();
    AlanBBOS.Interrupt = Interrupt;
})(AlanBBOS || (AlanBBOS = {}));
