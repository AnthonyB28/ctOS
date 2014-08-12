module AlanBBOS {
	export class ShellCommand {
		constructor(public command = "",
   					public description = "",
   					// Originally called function but that's a reserved word
    				public func = "") {

		}
	}
}
