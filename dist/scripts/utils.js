/* --------
Utils.ts
Utility functions.
-------- */
var CTOS;
(function (CTOS) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.trim = function (str) {
            // Use a regular expression to remove leading and trailing spaces.
            return str.replace(/^\s+ | \s+$/g, "");
            /*
            - The "|" separates this into two expressions, as in A or B.
            - "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
            - "\s+$" is the same thing, but at the end of the string.
            - "g" makes is global, so we get all the whitespace.
            - "" is nothing, which is what we replace the whitespace with.
            */
        };

        // Converts a string to hex data.
        // The result can be up to twice the length of the string.
        Utils.ConvertToHex = function (str) {
            var hexString = "";
            for (var i = 0; i < str.length; ++i) {
                hexString += str.charCodeAt(i).toString(16);
            }
            return hexString;
        };

        // Convert from hex data string to 'readable' string
        Utils.ConvertHexToString = function (str) {
            var hexString = "";
            for (var i = 0; i < str.length; ++i) {
                hexString += String.fromCharCode(parseInt(str.substr(i, 2), 16));
                ++i;
            }
            return hexString;
        };

        // Returns whether a string is a valid hex number or not
        Utils.IsValidHex = function (str) {
            if (str.length == 2 && parseInt(str, 16) >= 0) {
                return true;
            } else {
                return false;
            }
        };

        Utils.rot13 = function (str) {
            /*
            This is an easy-to understand implementation of the famous and common Rot13 obfuscator.
            You can do this in three lines with a complex regular expression, but I'd have
            trouble explaining it in the future.  There's a lot to be said for obvious code.
            */
            var retVal = "";
            for (var i in str) {
                var ch = str[i];
                var code = 0;
                if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) + 13; // It's okay to use 13.  It's not a magic number, it's called rot13.
                    retVal = retVal + String.fromCharCode(code);
                } else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) - 13; // It's okay to use 13.  See above.
                    retVal = retVal + String.fromCharCode(code);
                } else {
                    retVal = retVal + ch;
                }
            }
            return retVal;
        };
        return Utils;
    })();
    CTOS.Utils = Utils;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=utils.js.map
