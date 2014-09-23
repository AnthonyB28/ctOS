var CTOS;
(function (CTOS) {
    var ShellCommand = (function () {
        function ShellCommand(func, command, description) {
            if (typeof command === "undefined") { command = ""; }
            if (typeof description === "undefined") { description = ""; }
            this.func = func;
            this.command = command;
            this.description = description;
        }
        return ShellCommand;
    })();
    CTOS.ShellCommand = ShellCommand;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=shellCommand.js.map
