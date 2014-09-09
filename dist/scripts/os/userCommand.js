var CTOS;
(function (CTOS) {
    var UserCommand = (function () {
        function UserCommand(command, args) {
            if (typeof command === "undefined") { command = ""; }
            if (typeof args === "undefined") { args = []; }
            this.command = command;
            this.args = args;
        }
        return UserCommand;
    })();
    CTOS.UserCommand = UserCommand;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=userCommand.js.map
