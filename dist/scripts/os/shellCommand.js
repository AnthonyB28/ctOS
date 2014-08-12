var AlanBBOS;
(function (AlanBBOS) {
    var ShellCommand = (function () {
        function ShellCommand(command, description, // Originally called function but that's a reserved word
        func) {
            if (typeof command === "undefined") { command = ""; }
            if (typeof description === "undefined") { description = ""; }
            if (typeof func === "undefined") { func = ""; }
            this.command = command;
            this.description = description;
            this.func = func;
        }
        return ShellCommand;
    })();
    AlanBBOS.ShellCommand = ShellCommand;
})(AlanBBOS || (AlanBBOS = {}));
