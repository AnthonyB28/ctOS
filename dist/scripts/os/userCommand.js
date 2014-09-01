var TSOS;
(function (TSOS) {
    var UserCommand = (function () {
        function UserCommand(command, args) {
            if (typeof command === "undefined") { command = ""; }
            if (typeof args === "undefined") { args = []; }
            this.command = command;
            this.args = args;
        }
        return UserCommand;
    })();
    TSOS.UserCommand = UserCommand;
})(TSOS || (TSOS = {}));
