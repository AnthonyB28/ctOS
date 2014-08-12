var AlanBBOS;
(function (AlanBBOS) {
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
    AlanBBOS.ShellCommand = ShellCommand;
})(AlanBBOS || (AlanBBOS = {}));
