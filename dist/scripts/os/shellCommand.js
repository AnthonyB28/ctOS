var TSOS;
(function (TSOS) {
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
    TSOS.ShellCommand = ShellCommand;
})(TSOS || (TSOS = {}));
